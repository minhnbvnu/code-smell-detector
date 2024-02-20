function getJsxFactoryEntity(location) {
                return location ? (getJsxNamespace(location), getSourceFileOfNode(location).localJsxFactory || _jsxFactoryEntity) : _jsxFactoryEntity;
            }