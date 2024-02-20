async function masterPasswordLogin(noPasswordCallback) {
  // This does no harm if master password isn't set.
  let tokendb = Cc["@mozilla.org/security/pk11tokendb;1"].createInstance(
    Ci.nsIPK11TokenDB
  );
  let token = tokendb.getInternalKeyToken();

  // If there is no master password, still give the user a chance to opt-out of displaying passwords
  if (token.checkPassword("")) {
    return noPasswordCallback ? noPasswordCallback() : true;
  }

  // So there's a master password. But since checkPassword didn't succeed, we're logged out (per nsIPK11Token.idl).
  try {
    // Relogin and ask for the master password.
    token.login(true); // 'true' means always prompt for token password. User will be prompted until
    // clicking 'Cancel' or entering the correct password.
  } catch (e) {
    // An exception will be thrown if the user cancels the login prompt dialog.
    // User is also logged out of Software Security Device.
  }

  return token.isLoggedIn();
}