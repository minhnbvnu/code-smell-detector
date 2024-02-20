function emitJsxAttributeValue(node) {
                pipelineEmit(isStringLiteral(node) ? 6 /* JsxAttributeValue */ : 4 /* Unspecified */, node);
            }