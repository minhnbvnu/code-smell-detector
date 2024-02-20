function confirmClickDirective() {
  let i = 0;
  return {
    restrict: 'A',
    priority: 1,
    compile: function (tElem, tAttrs) {
      const fn = '$$confirmClick' + i++,
        _ngClick = tAttrs.ngClick;
      tAttrs.ngClick = fn + '($event)';

      return function (scope, elem, attrs) {
        const confirmTitle = attrs.confirmClickTitle || 'Please confirm';
        const confirmMsg = attrs.confirmClick || 'Are you sure?';

        scope[fn] = function (event) {
          $('#modal_confirm').modal('show');
          $('#modal_body').text(confirmMsg);
          $('#modal_title').text(confirmTitle);
          $('#modal_confirm').one('click', '#modal_save_btn', function (e) {
            scope.$eval(_ngClick, { $event: event });
            try {
              $('#modal_confirm').modal('hide');
            } catch (err) {
              // Bug in bootstrap 4 with hiding = transition error
            }
          });
        };
      };
    }
  };
}