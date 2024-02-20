function getDocCommentTemplateAtPosition2(fileName, position, options, formatOptions) {
                const formatSettings = formatOptions ? ts_formatting_exports.getFormatContext(formatOptions, host).options : void 0;
                return ts_JsDoc_exports.getDocCommentTemplateAtPosition(getNewLineOrDefaultFromHost(host, formatSettings), syntaxTreeCache.getCurrentSourceFile(fileName), position, options);
            }