function getTypeNodeIfAccessible(type, enclosingScope, program, host) {
            const checker = program.getTypeChecker();
            let typeIsAccessible = true;
            const notAccessible = () => typeIsAccessible = false;
            const res = checker.typeToTypeNode(type, enclosingScope, 1 /* NoTruncation */, {
                trackSymbol: (symbol, declaration, meaning) => {
                    typeIsAccessible = typeIsAccessible && checker.isSymbolAccessible(symbol, declaration, meaning, 
                    /*shouldComputeAliasToMarkVisible*/
                    false).accessibility === 0 /* Accessible */;
                    return !typeIsAccessible;
                },
                reportInaccessibleThisError: notAccessible,
                reportPrivateInBaseOfClassExpression: notAccessible,
                reportInaccessibleUniqueSymbolError: notAccessible,
                moduleResolverHost: getModuleSpecifierResolverHost(program, host)
            });
            return typeIsAccessible ? res : void 0;
        }