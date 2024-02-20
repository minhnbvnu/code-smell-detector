function autoCreateInPanel(panel) {
        var widgetId = panel.attr("id");
        var elements = panel.find(".demoWidget");
        if (typeof elements[widgetId] == "function")
            elements[widgetId]();
    }