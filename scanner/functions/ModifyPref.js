async function ModifyPref(entry) {
  if (entry.lockCol == PREF_IS_LOCKED) {
    return false;
  }

  let [title] = [`Enter ${gTypeStrs[entry.typeCol]} value`];

  if (entry.typeCol == nsIPrefBranch.PREF_BOOL) {
    var check = { value: entry.valueCol == "false" };
    if (
      !entry.valueCol &&
      !Services.prompt.select(
        window,
        title,
        entry.prefCol,
        [false, true],
        check
      )
    ) {
      return false;
    }
    gPrefBranch.setBoolPref(entry.prefCol, check.value);
  } else {
    var result = { value: entry.valueCol };
    var dummy = { value: 0 };
    if (
      !Services.prompt.prompt(window, title, entry.prefCol, result, null, dummy)
    ) {
      return false;
    }
    if (entry.typeCol == nsIPrefBranch.PREF_INT) {
      // | 0 converts to integer or 0; - 0 to float or NaN.
      // Thus, this check should catch all cases.
      var val = result.value | 0;
      if (val != result.value - 0) {
        const [err_title, err_text] = ['Invalid value', 'The text you entered is not a number.'];

        Services.prompt.alert(window, err_title, err_text);
        return false;
      }
      gPrefBranch.setIntPref(entry.prefCol, val);
    } else {
      gPrefBranch.setStringPref(entry.prefCol, result.value);
    }
  }

  Services.prefs.savePrefFile(null);
  return true;
}