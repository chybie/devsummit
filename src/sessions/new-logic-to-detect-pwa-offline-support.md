---
layout: layouts/session/index.njk
title: New logic to detect PWA offline support
speakers:
  - asami-doi
start: 2020/12/10 10:40
end: 2020/12/10 10:49
description: Chrome is researching to ship some new logic to detect if a PWA really works while offline before offering an install button.
youtubeId: hoEE39yB2Pg
---

PWA install prompt (e.g. a “plus-in-circle” icon in Chrome's Omnibox) enables users to install a website. Currently, Chrome shows the PWA install prompts whenever a site has a manifest.json with the correct fields filled in, a secure domain and icons, and a service worker with a fetch handler, with the expectation that such a site will work offline. However, some PWAs can show the install prompts although they do not support offline pages by installing an empty fetch event handler in a service worker. This leads to unexpected behavior for users such as showing the dinosaur page which tells no internet connection. Chrome proposes changing the logic to raise the bar to show the prompts. Concretely, Chrome will actually invoke a fetch event handler with a fake request to see if the handler returns a response with 200 status code, which is a strong signal that the site actually supports the offline capability. The PWA install prompts show up only when a site has a fetch event handler which returns a response with 200 status code.

This new logic is not available yet. Chrome will run experiments to see how many websites are affected and make sure that the new logic will not cause an unacceptable delay to the page loading time. Chrome will ship the feature after sufficient announcements have been made.
