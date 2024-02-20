function shouldHoistForInitializer(node) {
                return isVariableDeclarationList(node) && shouldHoistVariableDeclarationList(node);
            }