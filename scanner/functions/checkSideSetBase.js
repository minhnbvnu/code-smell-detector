function checkSideSetBase(mml) {
        var base = mml.childNodes[0];
        return base && base.isKind('mi') && base.getText() === '';
    }