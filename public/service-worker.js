// const installEvent = () => {
//     self.addEventListener('install', () => {
//       console.log('service worker installed');
//     });
//   };
//   installEvent();
  
//   const activateEvent = () => {
//     self.addEventListener('activate', () => {
//       console.log('service worker activated');
//     });
//   };
//   activateEvent();

//   const cacheName = 'v1'

// const cacheClone = async (e) => {
//   try {
//     const res = await fetch(e.request);
//     const resClone = res.clone();

//     const cache = await caches.open(cacheName);
//     await cache.put(e.request, resClone);
//     return res;
//   } catch (error) {
//     return caches.match(e.request);
//   }
// };

// const fetchEvent = () => {
//   self.addEventListener('fetch', (e) => {
//     e.respondWith(cacheClone(e));
//   });
// };

// fetchEvent();