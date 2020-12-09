---
layout: layouts/session/index.njk
title: Enable and debug crossOriginIsolated
speakers:
  - camille-lamy
start: 2020/12/09 11:40
end: 2020/12/09 11:50
description: How to opt into privileged features in a secure way.
youtubeId: D5DLVo_TlEA
---

To mitigate the risk of side-channel attacks, browsers offer an opt-in-based isolated environment called cross-origin isolated. With a cross-origin isolated state, the webpage can use privileged features in a secure way. We'll show why you should adopt crossOriginIsolated and how to implement and test it in Chrome DevTools.

We will walk you through the steps to:

- Isolate your site using COOP/COEP
- Test the implementation with DevTools
- Use a reporting API to verify that your site works correctly for your users
- Enable powerful features such as SAB / memory measurement
