function AzkError(translation_key) {
  var superInstance = Error.apply(null, [translation_key]);
  copyOwnFrom(this, superInstance);

  this.base_translation_key = 'errors.';
  this.translation_key = translation_key;

  // if true will report errors to crash report
  this.report = false;
  this.code   = BASE_CODE_ERROR;

  this.__defineGetter__('message', function() {
    return this.toString();
  });
}