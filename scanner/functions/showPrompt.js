function showPrompt(opts) {
    var scope = $rootScope.$new(true);
    scope.data = {};
    scope.data.fieldtype = opts.inputType ? opts.inputType : 'text';
    scope.data.response = opts.defaultText ? opts.defaultText : '';
    scope.data.placeholder = opts.inputPlaceholder ? opts.inputPlaceholder : '';
    scope.data.maxlength = opts.maxLength ? parseInt(opts.maxLength) : '';
    var text = '';
    if (opts.template && /<[a-z][\s\S]*>/i.test(opts.template) === false) {
      text = '<span>' + opts.template + '</span>';
      delete opts.template;
    }
    return showPopup(extend({
      template: text + '<input ng-model="data.response" '
        + 'type="{{ data.fieldtype }}"'
        + 'maxlength="{{ data.maxlength }}"'
        + 'placeholder="{{ data.placeholder }}"'
        + '>',
      scope: scope,
      buttons: [{
        text: opts.cancelText || 'Cancel',
        type: opts.cancelType || 'button-default',
        onTap: function() {}
      }, {
        text: opts.okText || 'OK',
        type: opts.okType || 'button-positive',
        onTap: function() {
          return scope.data.response || '';
        }
      }]
    }, opts || {}));
  }