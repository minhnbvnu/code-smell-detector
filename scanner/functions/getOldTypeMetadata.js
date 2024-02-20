function getOldTypeMetadata(node, container) {
                if (typeSerializer) {
                    let decorators;
                    if (shouldAddTypeMetadata(node)) {
                        const typeMetadata = emitHelpers().createMetadataHelper("design:type", typeSerializer.serializeTypeOfNode({ currentLexicalScope, currentNameScope: container }, node));
                        decorators = append(decorators, factory2.createDecorator(typeMetadata));
                    }
                    if (shouldAddParamTypesMetadata(node)) {
                        const paramTypesMetadata = emitHelpers().createMetadataHelper("design:paramtypes", typeSerializer.serializeParameterTypesOfNode({ currentLexicalScope, currentNameScope: container }, node, container));
                        decorators = append(decorators, factory2.createDecorator(paramTypesMetadata));
                    }
                    if (shouldAddReturnTypeMetadata(node)) {
                        const returnTypeMetadata = emitHelpers().createMetadataHelper("design:returntype", typeSerializer.serializeReturnTypeOfNode({ currentLexicalScope, currentNameScope: container }, node));
                        decorators = append(decorators, factory2.createDecorator(returnTypeMetadata));
                    }
                    return decorators;
                }
            }