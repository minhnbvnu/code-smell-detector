function generateJavascript() {
    var $checked = $('#plugin-section input:checked')
    if (!$checked.length) return false

    var js = $checked
      .map(function () { return __js[this.value] })
      .toArray()
      .join('\n')

    return {
      'bootstrap.js': js,
      'bootstrap.min.js': cw + uglify(js)
    }
  }