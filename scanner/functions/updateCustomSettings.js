function updateCustomSettings(settings) {
    if (settings.weight) {
        document.forms["weight_form"][`weight_${settings.weight}`].checked = true
        updateWeight(null, weightForm)
    }
    if (settings.letterSpacing) {
        document.forms["letter_spacing_form"][`letter_spacing_${settings.letterSpacing}`].checked = true
        updateLetterSpacing(null, letterSpacingForm)
    }
    if (settings.lineHeight) {
        document.forms["line_height_form"][`line_height_${settings.lineHeight}`].checked = true
        updateLineHeight(null, lineHeightForm)
    }
    if (settings.alternates) {
        Object.entries(settings.alternates).forEach(([feature, enabled]) => {
            document.forms["examplesettings_form"][`${feature}_${enabled}`].checked = true
        })
        updateExampleSettings(null, exampleSettingsForm, false)
    }
}