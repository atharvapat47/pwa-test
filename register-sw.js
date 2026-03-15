if ("serviceWorker" in navigator) {
 window.addEventListener("load", () => {
   navigator.serviceWorker.register("/pwa-test/sw.js")
     .then(reg => {
       console.log("Service Worker Registered");
     })
     .catch(err => {
       console.log("Service Worker Failed", err);
     });
 });
}