function destroyInPanel(panel) {
        if (!panel || panel.length === 0)
            return;
        var widgetId = panel.attr("id");
        if (!widgetId || $.inArray(widgetId, coreWidgets) == -1)
            return;

        switch (widgetId) {
        	case "accordion":
        		autoDestroyInPanel(panel);
        		panel.find(".destroyMe").remove();
        	break;
            case "slider":
                autoDestroyInPanel(panel);
                destroySliders(panel);
                break;
            case "menubar":
                autoDestroyInPanel(panel);
                $("#menubarStatusUpdater").remove();
                break;
            case "button":
            	$("#toolbar").find(":ui-button").unbind("click");
            	autoDestroyInPanel(panel);
            	$("#buttonStatusUpdater").remove();
                $("#repeat").buttonset("destroy");
                $("#repeat").removeClass("hiddenFieldset");
                $("#toolbar").removeClass("ui-widget-header").removeClass("ui-corner-all");
                break;
            case "autocomplete":
                autoDestroyInPanel(panel);
                $( "#tags-2" ).unbind();
                break;
            case "tooltip":
                $("#tooltipToggler").remove();
                autoDestroyInPanel(panel);
                break;
            default:
                autoDestroyInPanel(panel);
                break;
        }
    }