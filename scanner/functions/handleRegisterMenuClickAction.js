function handleRegisterMenuClickAction(menuId, uuid) {
    console.log(menuId, uuid);
    browser.runtime.sendMessage({ from: "popup", operate: "execRegisterMenuCommand", id: menuId, uuid: uuid });
    closeMenuPopup();
}