function visitIndexedAccessType(type) {
                    visitType(type.objectType);
                    visitType(type.indexType);
                    visitType(type.constraint);
                }