function getWidenedProperty(prop, context) {
                if (!(prop.flags & 4 /* Property */)) {
                    return prop;
                }
                const original = getTypeOfSymbol(prop);
                const propContext = context && createWideningContext(context, prop.escapedName, 
                /*siblings*/
                void 0);
                const widened = getWidenedTypeWithContext(original, propContext);
                return widened === original ? prop : createSymbolWithType(prop, widened);
            }