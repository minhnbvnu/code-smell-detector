function getNameFromJsxElementAttributesContainer(nameOfAttribPropContainer, jsxNamespace) {
                const jsxElementAttribPropInterfaceSym = jsxNamespace && getSymbol2(jsxNamespace.exports, nameOfAttribPropContainer, 788968 /* Type */);
                const jsxElementAttribPropInterfaceType = jsxElementAttribPropInterfaceSym && getDeclaredTypeOfSymbol(jsxElementAttribPropInterfaceSym);
                const propertiesOfJsxElementAttribPropInterface = jsxElementAttribPropInterfaceType && getPropertiesOfType(jsxElementAttribPropInterfaceType);
                if (propertiesOfJsxElementAttribPropInterface) {
                    if (propertiesOfJsxElementAttribPropInterface.length === 0) {
                        return "";
                    }
                    else if (propertiesOfJsxElementAttribPropInterface.length === 1) {
                        return propertiesOfJsxElementAttribPropInterface[0].escapedName;
                    }
                    else if (propertiesOfJsxElementAttribPropInterface.length > 1 && jsxElementAttribPropInterfaceSym.declarations) {
                        error(jsxElementAttribPropInterfaceSym.declarations[0], Diagnostics.The_global_type_JSX_0_may_not_have_more_than_one_property, unescapeLeadingUnderscores(nameOfAttribPropContainer));
                    }
                }
                return void 0;
            }