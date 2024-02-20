function updateSliderLabels(ui, valueLabels) {
        if (!ui.values)
            ui.values = [ui.value];
        // need to be able to determine which of the handles actually changes
        var index = $.inArray(ui.value, ui.values);
        var myAlign = index == 0 ? "right" : "left";
        var atAlign = index == 0 ? "left" : "right";
            $(valueLabels[index])
                .position({
                    my: myAlign + " bottom",
                    at : atAlign + " top",
                    of: ui.handle
                    })
                .text("$" + ui.value);
            return;
   }