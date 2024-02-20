async function updateSettings() {

  let localStorage = await browser.storage.local.get();

  if (!localStorage.settings) {
    localStorage.settings = {};
  }

  const checkboxes = document.querySelectorAll(".settings-checkbox");

  checkboxes.forEach((item) => {
    let settingName = item.id;
    item.checked = localStorage.settings[settingName];
  });

  await settingsCheckboxListener();
}