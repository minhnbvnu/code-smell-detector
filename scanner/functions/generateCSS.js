function generateCSS() {
    var oneChecked = false
    var lessFileIncludes = {}
    $('#less-section input').each(function() {
      var $this = $(this)
      var checked = $this.is(':checked')
      lessFileIncludes[$this.val()] = checked

      oneChecked = oneChecked || checked
    })

    if (!oneChecked) return false

    var result = {}
    var vars = {}
    var css = ''

    $('#less-variables-section input')
        .each(function () {
          $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
        })

    $.each(bootstrapLessFilenames(), function(index, filename) {
      var fileInclude = lessFileIncludes[filename]

      // Files not explicitly unchecked are compiled into the final stylesheet.
      // Core stylesheets like 'normalize.less' are not included in the form
      // since disabling them would wreck everything, and so their 'fileInclude'
      // will be 'undefined'.
      if (fileInclude || (fileInclude == null)) css += __less[filename]

      // Custom variables are added after Bootstrap variables so the custom
      // ones take precedence.
      if (('variables.less' === filename) && vars) css += generateCustomCSS(vars)
    })

    css = css.replace(/@import[^\n]*/gi, '') //strip any imports

    try {
      var parser = new less.Parser({
          paths: ['variables.less', 'mixins.less']
        , optimization: 0
        , filename: 'bootstrap.css'
      }).parse(css, function (err, tree) {
        if (err) {
          return showError('<strong>Ruh roh!</strong> Could not parse less files.', err)
        }
        result = {
          'bootstrap.css'     : cw + tree.toCSS(),
          'bootstrap.min.css' : cw + tree.toCSS({ compress: true })
        }
      })
    } catch (err) {
      return showError('<strong>Ruh roh!</strong> Could not parse less files.', err)
    }

    return result
  }