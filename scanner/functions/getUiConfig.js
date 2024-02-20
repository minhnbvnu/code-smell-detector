function getUiConfig() {
  // This configuration supports email/password and Google providers.
  return {
    'callbacks': {
      // Called when the user has been successfully signed in.
      'signInSuccess': function(user, credential, redirectUrl) {
        // Handle signed in user.
        handleSignedInUser(user);
        // Do not automatically redirect.
        return false;
      },
      'uiShown': function() {
        // Remove progress bar when the UI is ready.
        document.getElementById('loading').classList.add('hidden');
      }
    },
    'signInFlow': 'popup',
    'signInOptions': [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Whether the display name should be displayed in Sign Up page.
        requireDisplayName: true
      }
    ],
    // Terms of service url.
    'tosUrl': 'https://www.google.com',
    'credentialHelper': firebaseui.auth.CredentialHelper.NONE
  };
}