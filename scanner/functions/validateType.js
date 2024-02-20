function validateType(jsdocNode, type) {
                if (!type || !canTypeBeValidated(type.type)) {
                    return;
                }
                const typesToCheck = [];
                let elements = [];
                switch (type.type) {
                    case "TypeApplication": // {Array.<String>}
                        elements = type.applications[0].type === "UnionType" ? type.applications[0].elements : type.applications;
                        typesToCheck.push(getCurrentExpectedTypes(type));
                        break;
                    case "RecordType": // {{20:String}}
                        elements = type.fields;
                        break;
                    case "UnionType": // {String|number|Test}
                    case "ArrayType": // {[String, number, Test]}
                        elements = type.elements;
                        break;
                    case "FieldType": // Array.<{count: number, votes: number}>
                        if (type.value) {
                            typesToCheck.push(getCurrentExpectedTypes(type.value));
                        }
                        break;
                    default:
                        typesToCheck.push(getCurrentExpectedTypes(type));
                }
                elements.forEach(validateType.bind(null, jsdocNode));
                typesToCheck.forEach(typeToCheck => {
                    if (typeToCheck.expectedTypeName &&
                        typeToCheck.expectedTypeName !== typeToCheck.currentType.name) {
                        context.report({
                            node: jsdocNode,
                            messageId: "useType",
                            loc: getAbsoluteRange(jsdocNode, typeToCheck.currentType),
                            data: {
                                currentTypeName: typeToCheck.currentType.name,
                                expectedTypeName: typeToCheck.expectedTypeName
                            },
                            fix(fixer) {
                                return fixer.replaceTextRange(typeToCheck.currentType.range.map(indexInComment => jsdocNode.range[0] + 2 + indexInComment), typeToCheck.expectedTypeName);
                            }
                        });
                    }
                });
            }