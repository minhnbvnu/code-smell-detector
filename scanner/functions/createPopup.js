function createPopup(options) {
    options = extend({
      scope: null,
      title: '',
      buttons: []
    }, options || {});

    var self = {};
    self.scope = (options.scope || $rootScope).$new();
    self.element = jqLite(POPUP_TPL);
    self.responseDeferred = $q.defer();

    $ionicBody.get().appendChild(self.element[0]);
    $compile(self.element)(self.scope);

    extend(self.scope, {
      title: options.title,
      buttons: options.buttons,
      subTitle: options.subTitle,
      cssClass: options.cssClass,
      $buttonTapped: function(button, event) {
        var result = (button.onTap || noop).apply(self, [event]);
        event = event.originalEvent || event; //jquery events

        if (!event.defaultPrevented) {
          self.responseDeferred.resolve(result);
        }
      }
    });

    $q.when(
      options.templateUrl ?
      $ionicTemplateLoader.load(options.templateUrl) :
        (options.template || options.content || '')
    ).then(function(template) {
      var popupBody = jqLite(self.element[0].querySelector('.popup-body'));
      if (template) {
        popupBody.html(template);
        $compile(popupBody.contents())(self.scope);
      } else {
        popupBody.remove();
      }
    });

    self.show = function() {
      if (self.isShown || self.removed) return;

      $ionicModal.stack.add(self);
      self.isShown = true;
      ionic.requestAnimationFrame(function() {
        //if hidden while waiting for raf, don't show
        if (!self.isShown) return;

        self.element.removeClass('popup-hidden');
        self.element.addClass('popup-showing active');
        focusInput(self.element);
      });
    };

    self.hide = function(callback) {
      callback = callback || noop;
      if (!self.isShown) return callback();

      $ionicModal.stack.remove(self);
      self.isShown = false;
      self.element.removeClass('active');
      self.element.addClass('popup-hidden');
      $timeout(callback, 250, false);
    };

    self.remove = function() {
      if (self.removed) return;

      self.hide(function() {
        self.element.remove();
        self.scope.$destroy();
      });

      self.removed = true;
    };

    return self;
  }