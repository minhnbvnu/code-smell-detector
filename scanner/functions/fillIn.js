function fillIn(app, selector, context, text) {
  var $el;
  if (typeof text === 'undefined') {
    text = context;
    context = null;
  }
  $el = findWithAssert(app, selector, context);
  Ember.run(function() {
    $el.val(text).change();
  });
  return wait(app);
}