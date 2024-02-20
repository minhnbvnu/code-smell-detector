function getCustomizerData() {
    var vars = {}

    $('#less-variables-section input')
        .each(function () {
          $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
        })

    var data = {
      vars: vars,
      css: $('#less-section input:checked')  .map(function () { return this.value }).toArray(),
      js:  $('#plugin-section input:checked').map(function () { return this.value }).toArray()
    }

    if ($.isEmptyObject(data.vars) && !data.css.length && !data.js.length) return

    return data
  }