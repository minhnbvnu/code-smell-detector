function UpdateContextMenu() {
  let singleSelection = signonsTreeView.selection.count == 1;
  let menuItems = new Map();
  let menupopup = document.getElementById("signonsTreeContextMenu");
  for (let menuItem of menupopup.querySelectorAll("menuitem")) {
    menuItems.set(menuItem.id, menuItem);
  }

  if (!singleSelection) {
    for (let menuItem of menuItems.values()) {
      menuItem.setAttribute("disabled", "true");
    }
    return;
  }

  let selectedRow = signonsTree.currentIndex;

  // Don't display "Launch Site URL" if we're not a browser.
  if (window.openWebLinkIn) {
    menuItems.get("context-launchsiteurl").removeAttribute("disabled");
  } else {
    menuItems.get("context-launchsiteurl").setAttribute("disabled", "true");
    menuItems.get("context-launchsiteurl").setAttribute("hidden", "true");
  }

  // Disable "Copy Username" if the username is empty.
  if (signonsTreeView.getCellText(selectedRow, { id: "userCol" }) != "") {
    menuItems.get("context-copyusername").removeAttribute("disabled");
  } else {
    menuItems.get("context-copyusername").setAttribute("disabled", "true");
  }

  menuItems.get("context-copysiteurl").removeAttribute("disabled");
  menuItems.get("context-editusername").removeAttribute("disabled");
  menuItems.get("context-copypassword").removeAttribute("disabled");

  // Disable "Edit Password" if the password column isn't showing.
  if (!document.getElementById("passwordCol").hidden) {
    menuItems.get("context-editpassword").removeAttribute("disabled");
  } else {
    menuItems.get("context-editpassword").setAttribute("disabled", "true");
  }
}