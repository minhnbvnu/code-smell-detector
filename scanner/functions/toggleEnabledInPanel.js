function toggleEnabledInPanel(panel, enable) {
        var widgetId = panel.attr("id");

        switch (widgetId) {
            case "button":
                autoToggleEnabled(panel, enable);
                $("#repeat :radio").button(enable ? "enable" : "disable");
                break;
            case "tabs":
                $("#sampleTabs").tabs(enable ? "enable" : "disable", 1);
                break;
            case "autocomplete":
                if (enable)
                    $(":ui-autocomplete").removeAttr("disabled");
                else
                    $(":ui-autocomplete").attr("disabled", "disabled");

                break;
            default:
                autoToggleEnabled(panel, enable);
                break;
        }
    }