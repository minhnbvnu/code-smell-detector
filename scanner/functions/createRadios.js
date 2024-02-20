function createRadios(textField1, text1, textField2, text2) {
        var wrap = ui.view([0, 0, 300, 64]);
        var radio = NSButtonCell.alloc().init();
        radio.setButtonType(NSRadioButton);
        var matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
            NSMakeRect(0, 0, 300, 64),
            NSRadioModeMatrix,
            radio,
            2,
            1
        );
        matrixFormat.setCellSize(CGSizeMake(300, 32));
        var cells = matrixFormat.cells();
        cells.objectAtIndex(0).setTitle("                  " + text1);
        cells.objectAtIndex(1).setTitle("                  " + text2);
        wrap.addSubview(matrixFormat);
        wrap.addSubview(textField1);
        wrap.addSubview(textField2);
        dialog.addView(wrap);
        return matrixFormat;
    }