function shouldCheckAsExcessProperty(prop, container) {
                    return prop.valueDeclaration && container.valueDeclaration && prop.valueDeclaration.parent === container.valueDeclaration;
                }