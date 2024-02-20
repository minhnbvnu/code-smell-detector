function inferFromContravariantTypes(source, target) {
                    contravariant = !contravariant;
                    inferFromTypes(source, target);
                    contravariant = !contravariant;
                }