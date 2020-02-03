importScripts('/node_modules/workbox-sw/build/workbox-sw.js');

workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cssCache',
  })
);

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'jsCache',
  })
);

workbox.routing.registerRoute(
  // Cache assets files.
  /\.glb$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    cacheName: 'assetCache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 15,
        // Cache for a maximum of 3 weeks.
        maxAgeSeconds: 21 * 24 * 60 * 60,
      })
    ],
  })
);
