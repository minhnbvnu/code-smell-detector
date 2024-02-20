async function NewPref(type) {
  var result = { value: "" };
  var dummy = { value: 0 };

  let [newTitle, newPrompt] = [`New ${gTypeStrs[type]} value`, 'Enter the preference name'];

  if (
    Services.prompt.prompt(window, newTitle, newPrompt, result, null, dummy)
  ) {
    result.value = result.value.trim();
    if (!result.value) {
      return;
    }

    var pref;
    if (result.value in gPrefHash) {
      pref = gPrefHash[result.value];
    } else {
      pref = {
        prefCol: result.value,
        lockCol: PREF_IS_DEFAULT_VALUE,
        typeCol: type,
        valueCol: "",
      };
    }
    if (ModifyPref(pref)) {
      setTimeout(gotoPref, 0, result.value);
    }
  }
}