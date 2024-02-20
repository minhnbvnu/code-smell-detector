function visitMappedType(type) {
                    visitType(type.typeParameter);
                    visitType(type.constraintType);
                    visitType(type.templateType);
                    visitType(type.modifiersType);
                }