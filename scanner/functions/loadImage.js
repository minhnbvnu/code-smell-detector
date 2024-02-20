function loadImage() {
            $element.bind("load", function (e) {
              if ($attributes.imageSpinnerLoader) {
                //console.log ("DIRECTIVE: IMAGE LOADED");
                loader.remove();

                if ($attributes.imageonload) {
                  $scope.$apply($attributes.imageonload);
                 // fn($scope, {});
                }
                //imageLoadingDataShare.set(0);
                //console.log ("rendered");

                // lets wait for 2 frames for animation
                // to render - hoping this will improve tear 
                // of images
                ionic.DomUtil.requestAnimationFrame(
                  function () {
                    waitForFrame1();
                  });
              }
            });

            if ($scope.imageSpinnerBackgroundImage == "true") {
              var bgImg = new Image();
              bgImg.onload = function () {
                if ($attributes.imageSpinnerLoader) {
                  loader.remove();
                }
                // set style attribute on element (it will load image)
                if (imageLoadingDataShare.get() != 1)
                  $element[0].style.backgroundImage = 'url(' + $attributes.imageSpinnerSrc + ')';

                //$element[0].style.backgroundImage = 'url(' + 'img/noimage.png'+ ')';

              };

              bgImg.src = $attributes.imageSpinnerSrc;

            } else {
              var ld = NVR.getLogin();
              if (ld.isUseAuth && ($rootScope.authSession=='')) {
                NVR.log("waiting for authSession to have a value...");
              } else if ($attributes.imageSpinnerSrc) {
                $element[0].src = $attributes.imageSpinnerSrc; // set src 
              } else {
                NVR.log("No imageSpinnerSrc!");
              }
            }
          }