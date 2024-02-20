function shouldShowParameterNameHints(preferences) {
            return preferences.includeInlayParameterNameHints === "literals" || preferences.includeInlayParameterNameHints === "all";
        }