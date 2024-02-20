function getBuilderFileEmit(options) {
            let result = 1 /* Js */;
            if (options.sourceMap)
                result = result | 2 /* JsMap */;
            if (options.inlineSourceMap)
                result = result | 4 /* JsInlineMap */;
            if (getEmitDeclarations(options))
                result = result | 8 /* Dts */;
            if (options.declarationMap)
                result = result | 16 /* DtsMap */;
            if (options.emitDeclarationOnly)
                result = result & 24 /* AllDts */;
            return result;
        }