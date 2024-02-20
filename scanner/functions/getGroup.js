function getGroup(node) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.TSConditionalType:
                return Group.conditional;
            case utils_1.AST_NODE_TYPES.TSConstructorType:
            case utils_1.AST_NODE_TYPES.TSFunctionType:
                return Group.function;
            case utils_1.AST_NODE_TYPES.TSImportType:
                return Group.import;
            case utils_1.AST_NODE_TYPES.TSIntersectionType:
                return Group.intersection;
            case utils_1.AST_NODE_TYPES.TSAnyKeyword:
            case utils_1.AST_NODE_TYPES.TSBigIntKeyword:
            case utils_1.AST_NODE_TYPES.TSBooleanKeyword:
            case utils_1.AST_NODE_TYPES.TSNeverKeyword:
            case utils_1.AST_NODE_TYPES.TSNumberKeyword:
            case utils_1.AST_NODE_TYPES.TSObjectKeyword:
            case utils_1.AST_NODE_TYPES.TSStringKeyword:
            case utils_1.AST_NODE_TYPES.TSSymbolKeyword:
            case utils_1.AST_NODE_TYPES.TSThisType:
            case utils_1.AST_NODE_TYPES.TSUnknownKeyword:
            case utils_1.AST_NODE_TYPES.TSIntrinsicKeyword:
                return Group.keyword;
            case utils_1.AST_NODE_TYPES.TSNullKeyword:
            case utils_1.AST_NODE_TYPES.TSUndefinedKeyword:
            case utils_1.AST_NODE_TYPES.TSVoidKeyword:
                return Group.nullish;
            case utils_1.AST_NODE_TYPES.TSLiteralType:
            case utils_1.AST_NODE_TYPES.TSTemplateLiteralType:
                return Group.literal;
            case utils_1.AST_NODE_TYPES.TSArrayType:
            case utils_1.AST_NODE_TYPES.TSIndexedAccessType:
            case utils_1.AST_NODE_TYPES.TSInferType:
            case utils_1.AST_NODE_TYPES.TSTypeReference:
            case utils_1.AST_NODE_TYPES.TSQualifiedName:
                return Group.named;
            case utils_1.AST_NODE_TYPES.TSMappedType:
            case utils_1.AST_NODE_TYPES.TSTypeLiteral:
                return Group.object;
            case utils_1.AST_NODE_TYPES.TSTypeOperator:
            case utils_1.AST_NODE_TYPES.TSTypeQuery:
                return Group.operator;
            case utils_1.AST_NODE_TYPES.TSTupleType:
                return Group.tuple;
            case utils_1.AST_NODE_TYPES.TSUnionType:
                return Group.union;
            // These types should never occur as part of a union/intersection
            case utils_1.AST_NODE_TYPES.TSAbstractKeyword:
            case utils_1.AST_NODE_TYPES.TSAsyncKeyword:
            case utils_1.AST_NODE_TYPES.TSDeclareKeyword:
            case utils_1.AST_NODE_TYPES.TSExportKeyword:
            case utils_1.AST_NODE_TYPES.TSNamedTupleMember:
            case utils_1.AST_NODE_TYPES.TSOptionalType:
            case utils_1.AST_NODE_TYPES.TSPrivateKeyword:
            case utils_1.AST_NODE_TYPES.TSProtectedKeyword:
            case utils_1.AST_NODE_TYPES.TSPublicKeyword:
            case utils_1.AST_NODE_TYPES.TSReadonlyKeyword:
            case utils_1.AST_NODE_TYPES.TSRestType:
            case utils_1.AST_NODE_TYPES.TSStaticKeyword:
            case utils_1.AST_NODE_TYPES.TSTypePredicate:
                /* istanbul ignore next */
                throw new Error(`Unexpected Type ${node.type}`);
        }
    }