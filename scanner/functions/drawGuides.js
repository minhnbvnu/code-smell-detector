function drawGuides() {
        removeGuides(nativeArtboard);
        var values1 = getGuideValues(
            artboard.frame.width,
            columnNumberView.stepper.integerValue(),
            parseInt(columnWidthView.stringValue()),
            parseInt(columnGutterView.stringValue()),
            marginCheckbox.state() == NSOnState ? true : false,
            marginCheckbox.state() == NSOnState ? parseInt(marginLeftView.stringValue()) : 0,
            marginCheckbox.state() == NSOnState ? parseInt(marginRightView.stringValue()) : 0,
            centerHorizontalCheckbox.state() == NSOnState ? true : false
        );
        var values2 = getGuideValues(
            artboard.frame.height,
            rowNumberView.stepper.integerValue(),
            parseInt(rowWidthView.stringValue()),
            parseInt(rowGutterView.stringValue()),
            marginCheckbox.state() == NSOnState ? true : false,
            marginCheckbox.state() == NSOnState ? parseInt(marginTopView.stringValue()) : 0,
            marginCheckbox.state() == NSOnState ? parseInt(marginBottomView.stringValue()) : 0,
            centerVerticalCheckbox.state() == NSOnState ? true : false
        );
        if (columnsCheckbox.state() == NSOnState) {
            addGuides(nativeArtboard, 0, values1);
        }
        if (rowsCheckbox.state() == NSOnState) {
            addGuides(nativeArtboard, 1, values2);
        }
    }