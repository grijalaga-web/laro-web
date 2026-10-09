// Desactiva el service worker de la web antigua de LARŌ: borra su caché y se da de baja,
// para que quien ya la visitó no siga viendo la versión guardada y llegue a la redirección.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const claves = await caches.keys();
    await Promise.all(claves.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const ventanas = await self.clients.matchAll({ type: 'window' });
    ventanas.forEach((v) => v.navigate(v.url));
  })());
});
