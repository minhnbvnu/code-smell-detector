function splitSideSet(mml) {
        if (!mml || (mml.isInferred && mml.childNodes.length === 0))
            return [null, null];
        if (mml.isKind('msubsup') && checkSideSetBase(mml))
            return [mml, null];
        var child = NodeUtil_js_1.default.getChildAt(mml, 0);
        if (!(mml.isInferred && child && checkSideSetBase(child)))
            return [null, mml];
        mml.childNodes.splice(0, 1);
        return [child, mml];
    }