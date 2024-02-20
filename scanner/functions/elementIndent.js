function elementIndent(el) {
        const role = el.getAttribute("role");
        const startSlot = el.querySelector("[slot=start]");

        if (role !== MenuItemRole.menuitem && startSlot === null) {
          return 1;
        } else if (role === MenuItemRole.menuitem && startSlot !== null) {
          return 1;
        } else if (role !== MenuItemRole.menuitem && startSlot !== null) {
          return 2;
        } else {
          return 0;
        }
      }