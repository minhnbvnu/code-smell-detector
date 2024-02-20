async function onConfigLoad() {
  let configContext = document.getElementById("configContext");
  configContext.addEventListener("popupshowing", function(event) {
    if (event.target == this) {
      updateContextMenu();
    }
  });

  let commandListeners = {
    toggleSelected: ModifySelected,
    modifySelected: ModifySelected,
    copyPref,
    copyName,
    copyValue,
    resetSelected: ResetSelected,
  };

  configContext.addEventListener("command", e => {
    if (e.target.id in commandListeners) {
      commandListeners[e.target.id]();
    }
  });

  let configString = document.getElementById("configString");
  configString.addEventListener("command", function() {
    NewPref(nsIPrefBranch.PREF_STRING);
  });

  let configInt = document.getElementById("configInt");
  configInt.addEventListener("command", function() {
    NewPref(nsIPrefBranch.PREF_INT);
  });

  let configBool = document.getElementById("configBool");
  configBool.addEventListener("command", function() {
    NewPref(nsIPrefBranch.PREF_BOOL);
  });

  let keyVKReturn = document.getElementById("keyVKReturn");
  keyVKReturn.addEventListener("command", ModifySelected);

  let textBox = document.getElementById("textbox");
  textBox.addEventListener("command", FilterPrefs);

  let configFocuSearch = document.getElementById("configFocuSearch");
  configFocuSearch.addEventListener("command", function() {
    textBox.focus();
  });

  let configFocuSearch2 = document.getElementById("configFocuSearch2");
  configFocuSearch2.addEventListener("command", function() {
    textBox.focus();
  });

  let warningButton = document.getElementById("warningButton");
  warningButton.addEventListener("command", ShowPrefs);

  let configTree = document.getElementById("configTree");
  configTree.addEventListener("select", function() {
    window.updateCommands("select");
  });

  let configTreeBody = document.getElementById("configTreeBody");
  configTreeBody.addEventListener("dblclick", function(event) {
    if (event.button == 0) {
      ModifySelected();
    }
  });

  gLockStrs[PREF_IS_DEFAULT_VALUE] = 'default';
  gLockStrs[PREF_IS_MODIFIED] = 'modified';
  gLockStrs[PREF_IS_LOCKED] = 'locked';
  gTypeStrs[nsIPrefBranch.PREF_STRING] = 'string';
  gTypeStrs[nsIPrefBranch.PREF_INT] = 'integer';
  gTypeStrs[nsIPrefBranch.PREF_BOOL] = 'boolean';

  var showWarning = gPrefBranch.getBoolPref("general.warnOnAboutConfig");

  if (showWarning) {
    document.getElementById("warningButton").focus();
  } else {
    ShowPrefs();
  }
}