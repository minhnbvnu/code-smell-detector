function enabledExtension (info) {
    if (info.id === MAC_ADDON_ID) {
      macAddonEnabled = true;
    }
    if (info.id === RELAY_ADDON_ID) {
      relayAddonEnabled = true;
    }
  }