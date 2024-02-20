function getSignatureInstantiationWithoutFillingInTypeArguments(signature, typeArguments) {
                const instantiations = signature.instantiations || (signature.instantiations = /* @__PURE__ */ new Map());
                const id = getTypeListId(typeArguments);
                let instantiation = instantiations.get(id);
                if (!instantiation) {
                    instantiations.set(id, instantiation = createSignatureInstantiation(signature, typeArguments));
                }
                return instantiation;
            }