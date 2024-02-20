function getLoader() {
    if (!loaderInstance) {
      loaderInstance = $ionicTemplateLoader.compile({
        template: LOADING_TPL,
        appendTo: $ionicBody.get()
      })
      .then(function(self) {
        self.show = function(options) {
          var templatePromise = options.templateUrl ?
            $ionicTemplateLoader.load(options.templateUrl) :
            //options.content: deprecated
            $q.when(options.template || options.content || '');

          self.scope = options.scope || self.scope;

          if (!self.isShown) {
            //options.showBackdrop: deprecated
            self.hasBackdrop = !options.noBackdrop && options.showBackdrop !== false;
            if (self.hasBackdrop) {
              $ionicBackdrop.retain();
              $ionicBackdrop.getElement().addClass('backdrop-loading');
            }
          }

          if (options.duration) {
            $timeout.cancel(self.durationTimeout);
            self.durationTimeout = $timeout(
              angular.bind(self, self.hide),
              +options.duration
            );
          }

          deregisterBackAction();
          //Disable hardware back button while loading
          deregisterBackAction = $ionicPlatform.registerBackButtonAction(
            noop,
            IONIC_BACK_PRIORITY.loading
          );

          templatePromise.then(function(html) {
            if (html) {
              var loading = self.element.children();
              loading.html(html);
              $compile(loading.contents())(self.scope);
            }

            //Don't show until template changes
            if (self.isShown) {
              self.element.addClass('visible');
              ionic.requestAnimationFrame(function() {
                if (self.isShown) {
                  self.element.addClass('active');
                  $ionicBody.addClass('loading-active');
                }
              });
            }
          });

          self.isShown = true;
        };
        self.hide = function() {

          deregisterBackAction();
          if (self.isShown) {
            if (self.hasBackdrop) {
              $ionicBackdrop.release();
              $ionicBackdrop.getElement().removeClass('backdrop-loading');
            }
            self.element.removeClass('active');
            $ionicBody.removeClass('loading-active');
            self.element.removeClass('visible');
            ionic.requestAnimationFrame(function() {
              !self.isShown && self.element.removeClass('visible');
            });
          }
          $timeout.cancel(self.durationTimeout);
          self.isShown = false;
          var loading = self.element.children();
          loading.html("");
        };

        return self;
      });
    }
    return loaderInstance;
  }