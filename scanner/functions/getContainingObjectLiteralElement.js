function getContainingObjectLiteralElement(node) {
            const element = getContainingObjectLiteralElementWorker(node);
            return element && (isObjectLiteralExpression(element.parent) || isJsxAttributes(element.parent)) ? element : void 0;
        }