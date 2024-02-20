function form() {
    var elems = queryAllVisible(document, INPUT_FIELDS, undefined);
    var forms = [];
    for (var i = 0; i < elems.length; i++) {
      var form = elems[i].form;
      if (form && forms.indexOf(form) < 0) {
        forms.push(form);
      }
    }
    if (forms.length == 0) {
      return undefined;
    }
    if (forms.length == 1) {
      return forms[0];
    }

    // If there are multiple forms, try to detect which one is a login form
    var formProps = [];
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      var props = [form.id, form.name, form.className];
      formProps.push(props);
      for (var j = 0; j < FORM_MARKERS.length; j++) {
        var marker = FORM_MARKERS[j];
        for (var k = 0; k < props.length; k++) {
          var prop = props[k];
          if (prop.toLowerCase().indexOf(marker) > -1) {
            return form;
          }
        }
      }
    }

    console.error(
      "Unable to detect which of the multiple available forms is the login form. Please submit an issue for browserpass on github, and provide the following list in the details: " +
        JSON.stringify(formProps)
    );
    return forms[0];
  }