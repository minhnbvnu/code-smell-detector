function checkForPageUpdate(registration) {
    // onupdatefound will fire on first time install and when serviceWorker.js file changes      
    registration.addEventListener("updatefound", function() {
      // To check if service worker is already installed and controlling the page or not
      if (navigator.serviceWorker.controller) {
        var installingSW = registration.installing;
        installingSW.onstatechange = function() {
          console.info("Service Worker State :", installingSW.state);
          switch(installingSW.state) {
            case 'installed':
              // Now new contents will be added to cache and old contents will be remove so
              // this is perfect time to show user that page content is updated.
              toast('Site is updated. Refresh the page.', 5000);
              break;
            case 'redundant':
              throw new Error('The installing service worker became redundant.');
          }
        }
      }
    });
  }