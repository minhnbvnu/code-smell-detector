function waitForFrame1() {
            ionic.DomUtil.requestAnimationFrame(
              function () {
                imageLoadingDataShare.set(0);
                //console.log ("IMAGE LOADED");
              });
          }