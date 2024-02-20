function isNextTokenParentJsxAttribute(context) {
            return context.nextTokenParent.kind === 288 /* JsxAttribute */;
        }