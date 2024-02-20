function getClassOrObjectBraceEnds(cls, sourceFile) {
            const open = findChildOfKind(cls, 18 /* OpenBraceToken */, sourceFile);
            const close = findChildOfKind(cls, 19 /* CloseBraceToken */, sourceFile);
            return [open == null ? void 0 : open.end, close == null ? void 0 : close.end];
        }