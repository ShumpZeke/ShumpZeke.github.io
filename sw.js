const CACHE="dueradar-shell-67bfbbb55b3f2534";
const ASSETS=["./.nojekyll", "./assets/dm-sans.ttf", "./assets/dueradar-web-dxh4beaf5fd86bc1fd5.js", "./assets/dueradar-web_bg-dxhc7ccf172c681eb14.wasm", "./assets/manrope.ttf", "./assets/style-dxh309ace1964918aea.css", "./index.html"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('dueradar-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.includes('/api/'))return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.match('./index.html')));return;}
e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));});
