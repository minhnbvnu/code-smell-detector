function getJsxElementClassTypeAt(location) {
                const type = getJsxType(JsxNames.ElementClass, location);
                if (isErrorType(type))
                    return void 0;
                return type;
            }