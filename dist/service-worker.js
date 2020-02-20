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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    "revision": "b6c097ab00c08ef2b2639c5a15ed5970"
  },
  {
    "url": "main-01b02a03.js",
    "revision": "8defb31e2e2966a90769dd47cc14afe9"
=======
    "revision": "ced237952206c8284ffa3ecdbc29c904"
  },
  {
    "url": "main-2b6b38e3.js",
    "revision": "9cdb35a9da159e491bcadf031d0a4312"
>>>>>>> 8fa9ed9... adding in the planets
=======
    "revision": "ef23a6f817f0b01d8af443beba91a972"
  },
  {
    "url": "main-5507036c.js",
    "revision": "e4c8171e50eeb3fdea9b5be2aec43e69"
>>>>>>> a830ba2... Planets
=======
    "revision": "e0230259352b5c23fab0da25848f8841"
  },
  {
    "url": "main-70403b7c.js",
    "revision": "caf366eec38cc94fdaf0dea0df7d21cd"
>>>>>>> 49804e6... planets
=======
    "revision": "9702d634c8be0cc67bd9aa645ddbd135"
  },
  {
    "url": "main-c2ac4990.js",
    "revision": "50c68e234d0f68004e2bbddfe67fdb42"
>>>>>>> f5616c4... planets
=======
    "revision": "dd92f461c3c75a181b3077abc2e3540d"
  },
  {
    "url": "main-76c8c870.js",
    "revision": "114025ed4fd3bac5d5a8cbf2b59e0afc"
>>>>>>> 4ec9dc3... planets
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
<<<<<<< HEAD
<<<<<<< HEAD
    "revision": "401aeab9a8292605a3a6861b584a0cd2"
  },
  {
    "url": "src/main.js",
    "revision": "b09dbec03cd94c34cb62a5d94b62f1be"
=======
    "revision": "5b45ec97088b74ec2de3c89c0ccf3180"
  },
  {
    "url": "src/main.js",
<<<<<<< HEAD
<<<<<<< HEAD
    "revision": "0177d9bb59816c53e5cf71f8f76f7b8d"
>>>>>>> 8fa9ed9... adding in the planets
=======
    "revision": "b6b89bc8142821afdb90df001701eed4"
>>>>>>> a830ba2... Planets
=======
    "revision": "c817fc998af35095fecc1ae85497ef89"
>>>>>>> 49804e6... planets
=======
    "revision": "2fa9e954f22f8da28d44a390485d3be5"
  },
  {
    "url": "src/main.js",
<<<<<<< HEAD
    "revision": "1b15900a22e16b9a43e2fa6bdbf354d7"
>>>>>>> f5616c4... planets
=======
    "revision": "68510b830d24d03ba41dfd26c2e39594"
>>>>>>> 4ec9dc3... planets
  },
  {
    "url": "src/solar.js",
    "revision": "0118deb81f4ed2fbf54d85a3c0dfbcf3"
  },
  {
    "url": "style.css",
    "revision": "698b0960afaaf3a1d8fb020f0f16f258"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
