function showCompletionAlert(showPrompt) {
  var rule = "\n================\n";
  var alertText, alertHed, makePromo;

  if (errors.length > 0) {
    alertHed = "The Script Was Unable to Finish";
  } else if (detectTimesFonts()) {
    alertHed = "Actually, that\u2019s not half bad :)"; // &rsquo;
  } else {
    alertHed = "Nice work!";
  }
  alertText  = makeList(errors, "Error", "Errors");
  alertText += makeList(warnings, "Warning", "Warnings");
  alertText += makeList(feedback, "Information", "Information");
  alertText += "\n";
  if (showPrompt) {
    alertText += rule + "Generate promo image?";
    // confirm(<msg>, false) makes "Yes" the default (at Baden's request).
    makePromo = confirm(alertHed  + alertText, false);
  } else {
    alertText += rule + "ai2html v" + scriptVersion;
    alert(alertHed + alertText);
    makePromo = false;
  }

  function makeList(items, singular, plural) {
    var list = "";
    if (items.length > 0) {
      list += "\r" + (items.length == 1 ? singular : plural) + rule;
      for (var i = 0; i < items.length; i++) {
        list += "\u2022 " + items[i] + "\r";
      }
    }
    return list;
  }
  return makePromo;
}