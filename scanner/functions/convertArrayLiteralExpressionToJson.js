function convertArrayLiteralExpressionToJson(elements, elementOption) {
                if (!returnValue) {
                    elements.forEach((element) => convertPropertyValueToJson(element, elementOption));
                    return void 0;
                }
                return filter(elements.map((element) => convertPropertyValueToJson(element, elementOption)), (v) => v !== void 0);
            }