function getJSDocTypeAssertionType(node) {
            const type = getJSDocType(node);
            Debug.assertIsDefined(type);
            return type;
        }