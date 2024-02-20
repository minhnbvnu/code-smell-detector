async function checkSettings(setting){
  let fbcStorage = await browser.storage.local.get();

  if (setting) {
    return fbcStorage.settings[setting];
  }

  if (fbcStorage.settings) {
    return fbcStorage.settings;
  }

  await browser.storage.local.set({
    "settings": DEFAULT_SETTINGS
  });

}