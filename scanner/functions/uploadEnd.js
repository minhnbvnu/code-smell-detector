function uploadEnd() {
          // unbind load after uploadEnd to prevent another load triggering uploadEnd
          iframe.unbind('load');
          if (!scope.$$phase) {
            scope.$apply(function() {
              setLoadingState(false);
            });
          } else {
            setLoadingState(false);
          }
          // Get iframe body contents
          try {
              var bodyContent = (iframe[0].contentDocument ||
                iframe[0].contentWindow.document).body;

              var content;
              try {
                content = angular.fromJson(bodyContent.innerText || bodyContent.textContent);
                if (!scope.$$phase) {
                   scope.$apply(function () {
                       fn(scope, { content: content});
                   });
                } else {
                  fn(scope, { content: content});
                }
              } catch (e) {
                // Fall back to html if json parse failed
                content = bodyContent.innerHTML;
                var error = 'ng-upload: Response is not valid JSON';
                $log.warn(error);

                if ( errorCatcher ){
                   if (!scope.$$phase) {
                      scope.$apply(function () {
                          errorCatcher(scope, { error: error});
                      });
                   } else {
                     errorCatcher(scope, { error: error});
                   }
                }

              }
              // if outside a digest cycle, execute the upload response function in the active scope
              // else execute the upload response function in the current digest

          } catch (error) {
            $log.warn('ng-upload: Server error');

            if ( errorCatcher ){
               if (!scope.$$phase) {
                  scope.$apply(function () {
                      errorCatcher(scope, { error: error});
                  });
               } else {
                 errorCatcher(scope, { error: error});
               }
            }

          }
        }