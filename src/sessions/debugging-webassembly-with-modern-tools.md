---
layout: layouts/session/index.njk
title: Debugging WebAssembly with modern tools
speakers:
  - ingvar-stepanyan
start: 2020/12/10 10:00
end: 2020/12/10 10:10
description: Debugging WebAssembly has gotten a lot better in the last year, here's how…
#youtubeId: VBMHswhun-s
---

WebAssembly is a binary format that allows developers to bring their experience and applications from a variety of programming languages to the web, and to share those experiences with even more users across all platforms.

However, porting code to a new target always comes with its own challenges: providing custom bindings to the host APIs, removing pieces that are not compatible with the chosen target, and, of course, finding hidden assumptions that only worked by chance on the original platform (or, as we like to call them: bugs). To successfully overcome these challenges, you want to be able to debug your source code not just on the platform it was originally built for, but on the target one as well. This talk looks at:

- How Chrome DevTools and Emscripten close this gap for C++ apps on the web
- New debugging features built over the last year
- Future integrations that still lie ahead
