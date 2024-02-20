function* generateObjectLiteralElements(node) {
                if (!length(node.properties))
                    return;
                for (const prop of node.properties) {
                    if (isSpreadAssignment(prop))
                        continue;
                    const type = getLiteralTypeFromProperty(getSymbolOfDeclaration(prop), 8576 /* StringOrNumberLiteralOrUnique */);
                    if (!type || type.flags & 131072 /* Never */) {
                        continue;
                    }
                    switch (prop.kind) {
                        case 175 /* SetAccessor */:
                        case 174 /* GetAccessor */:
                        case 171 /* MethodDeclaration */:
                        case 300 /* ShorthandPropertyAssignment */:
                            yield { errorNode: prop.name, innerExpression: void 0, nameType: type };
                            break;
                        case 299 /* PropertyAssignment */:
                            yield { errorNode: prop.name, innerExpression: prop.initializer, nameType: type, errorMessage: isComputedNonLiteralName(prop.name) ? Diagnostics.Type_of_computed_property_s_value_is_0_which_is_not_assignable_to_type_1 : void 0 };
                            break;
                        default:
                            Debug.assertNever(prop);
                    }
                }
            }