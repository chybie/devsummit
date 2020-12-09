package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"
)

const (
	siteTarget      = "https://chromedevsummit-site.firebaseapp.com/"
	adventureTarget = "https://cds-adventure-corp-2.web.app"
	adventurePrefix = "/devsummit/adventure"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	siteTargetURL, err := url.Parse(siteTarget)
	if err != nil {
		panic(err)
	}
	adventureTargetURL, err := url.Parse(adventureTarget)
	if err != nil {
		panic(err)
	}

	siteReverseProxy := &httputil.ReverseProxy{
		Director: func(req *http.Request) {
			req.URL.Scheme = siteTargetURL.Scheme
			req.URL.Host = siteTargetURL.Host
			req.Host = siteTargetURL.Host
			req.Header.Set("Host", siteTargetURL.Host)
		},
	}

	adventureReverseProxy := &httputil.ReverseProxy{
		Director: func(req *http.Request) {
			req.URL.Scheme = adventureTargetURL.Scheme
			req.URL.Host = adventureTargetURL.Host
			req.Host = adventureTargetURL.Host
			req.Header.Set("Host", adventureTargetURL.Host)
		},
	}

	err = http.ListenAndServe(fmt.Sprintf(":%s", port), http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		if strings.HasPrefix(req.URL.Path, adventurePrefix) {
			req.URL.Path = strings.Replace(req.URL.Path, adventurePrefix, "", -1)
			if req.URL.Path == "" {
				http.Redirect(w, req, adventurePrefix+"/", http.StatusTemporaryRedirect)
			}
			adventureReverseProxy.ServeHTTP(w, req)
			return
		}
		siteReverseProxy.ServeHTTP(w, req)
	}))
	if err != nil {
		log.Fatalf("Could not start reverse proxy: %s", err)
	}
}
