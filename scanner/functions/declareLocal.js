function declareLocal(name) {
                const temp = name ? factory2.createUniqueName(name) : factory2.createTempVariable(
                /*recordTempVariable*/
                void 0);
                hoistVariableDeclaration(temp);
                return temp;
            }