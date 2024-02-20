function disabledExtension (info) {
    if (info.id === MAC_ADDON_ID) {
      macAddonEnabled = false;
    }
    if (info.id === RELAY_ADDON_ID) {
      relayAddonEnabled = false;
    }
  }