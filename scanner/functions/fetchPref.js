function fetchPref(prefName, prefIndex) {
  var pref = new prefObject(prefName);

  gPrefHash[prefName] = pref;
  gPrefArray[prefIndex] = pref;

  if (gPrefBranch.prefIsLocked(prefName)) {
    pref.lockCol = PREF_IS_LOCKED;
  } else if (gPrefBranch.prefHasUserValue(prefName)) {
    pref.lockCol = PREF_IS_MODIFIED;
  }

  try {
    switch (gPrefBranch.getPrefType(prefName)) {
      case gPrefBranch.PREF_BOOL:
        pref.typeCol = gPrefBranch.PREF_BOOL;
        // convert to a string
        pref.valueCol = gPrefBranch.getBoolPref(prefName).toString();
        break;
      case gPrefBranch.PREF_INT:
        pref.typeCol = gPrefBranch.PREF_INT;
        // convert to a string
        pref.valueCol = gPrefBranch.getIntPref(prefName).toString();
        break;
      default:
      case gPrefBranch.PREF_STRING:
        pref.valueCol = gPrefBranch.getStringPref(prefName);
        // Try in case it's a localized string (will throw an exception if not)
        if (
          pref.lockCol == PREF_IS_DEFAULT_VALUE &&
          /^chrome:\/\/.+\/locale\/.+\.properties/.test(pref.valueCol)
        ) {
          pref.valueCol = gPrefBranch.getComplexValue(
            prefName,
            nsIPrefLocalizedString
          ).data;
        }
        break;
    }
  } catch (e) {
    // Also catch obscure cases in which you can't tell in advance
    // that the pref exists but has no user or default value...
  }
}