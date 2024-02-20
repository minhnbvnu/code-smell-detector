function updateDownloadSettings(type, feature) {
        const key = feature.split("' ")[0].slice(1)
        const value = feature.split("' ")[1] == "on"
        downloadSettingsCustom[type][key] = value
        if (isDefault) downloadSettingsDefault[type][key] = value
    }