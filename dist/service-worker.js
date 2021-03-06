/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "374c6e72e332fb32d182aaa1331d7671"
  },
  {
    "url": "main-d99c9f69.js",
    "revision": "696093b5a6204eecbba02bda0a4afb2e"
  },
  {
    "url": "model/planets-glb/neptune/Neptune.glb",
    "revision": "b22fc6c5706582d982eb867be9c19159"
  },
  {
    "url": "model/planets-glb/uranus/Uranus.glb",
    "revision": "82af7750084d9c843eec63a5655eaced"
  },
  {
    "url": "model/planets-glb/venus/Venus.glb",
    "revision": "97df6b856aabf83f455d10884bf1f7f1"
  },
  {
    "url": "polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js",
    "revision": "cff507bc95ad1d6bf1a415cc9c8852b0"
  },
  {
    "url": "polyfills/dynamic-import.b745cfc9384367cc18b42bbef2bbdcd9.js",
    "revision": "ed55766050be285197b8f511eacedb62"
  },
  {
    "url": "polyfills/webcomponents.d406f4685fdfb412c61f23b3ae18f2dc.js",
    "revision": "b1db7cb76380495a55ff4f65a9648f0e"
  },
  {
    "url": "solarSystem.json",
    "revision": "401aeab9a8292605a3a6861b584a0cd2"
  },
  {
    "url": "src/main.js",
    "revision": "6b87fa9d9f124fb47a48cc1cbc1d1ea6"
  },
  {
    "url": "src/solar.js",
    "revision": "a0fd465d3f5bd64145dddad9b1c70a2d"
  },
  {
    "url": "style.css",
    "revision": "698b0960afaaf3a1d8fb020f0f16f258"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
