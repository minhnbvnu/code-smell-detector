function isAsyncMemberOrProperty(propertyOrMemberNode) {
                return Boolean('value' in propertyOrMemberNode &&
                    propertyOrMemberNode.value &&
                    'async' in propertyOrMemberNode.value &&
                    propertyOrMemberNode.value.async);
            }