function inferToTemplateLiteralType(source, target) {
                    const matches = inferTypesFromTemplateLiteralType(source, target);
                    const types = target.types;
                    if (matches || every(target.texts, (s) => s.length === 0)) {
                        for (let i = 0; i < types.length; i++) {
                            const source2 = matches ? matches[i] : neverType;
                            const target2 = types[i];
                            if (source2.flags & 128 /* StringLiteral */ && target2.flags & 8650752 /* TypeVariable */) {
                                const inferenceContext = getInferenceInfoForType(target2);
                                const constraint = inferenceContext ? getBaseConstraintOfType(inferenceContext.typeParameter) : void 0;
                                if (constraint && !isTypeAny(constraint)) {
                                    const constraintTypes = constraint.flags & 1048576 /* Union */ ? constraint.types : [constraint];
                                    let allTypeFlags = reduceLeft(constraintTypes, (flags, t) => flags | t.flags, 0);
                                    if (!(allTypeFlags & 4 /* String */)) {
                                        const str = source2.value;
                                        if (allTypeFlags & 296 /* NumberLike */ && !isValidNumberString(str, 
                                        /*roundTripOnly*/
                                        true)) {
                                            allTypeFlags &= ~296 /* NumberLike */;
                                        }
                                        if (allTypeFlags & 2112 /* BigIntLike */ && !isValidBigIntString(str, 
                                        /*roundTripOnly*/
                                        true)) {
                                            allTypeFlags &= ~2112 /* BigIntLike */;
                                        }
                                        const matchingType = reduceLeft(constraintTypes, (left, right) => !(right.flags & allTypeFlags) ? left : left.flags & 4 /* String */ ? left : right.flags & 4 /* String */ ? source2 : left.flags & 134217728 /* TemplateLiteral */ ? left : right.flags & 134217728 /* TemplateLiteral */ && isTypeMatchedByTemplateLiteralType(source2, right) ? source2 : left.flags & 268435456 /* StringMapping */ ? left : right.flags & 268435456 /* StringMapping */ && str === applyStringMapping(right.symbol, str) ? source2 : left.flags & 128 /* StringLiteral */ ? left : right.flags & 128 /* StringLiteral */ && right.value === str ? right : left.flags & 8 /* Number */ ? left : right.flags & 8 /* Number */ ? getNumberLiteralType(+str) : left.flags & 32 /* Enum */ ? left : right.flags & 32 /* Enum */ ? getNumberLiteralType(+str) : left.flags & 256 /* NumberLiteral */ ? left : right.flags & 256 /* NumberLiteral */ && right.value === +str ? right : left.flags & 64 /* BigInt */ ? left : right.flags & 64 /* BigInt */ ? parseBigIntLiteralType(str) : left.flags & 2048 /* BigIntLiteral */ ? left : right.flags & 2048 /* BigIntLiteral */ && pseudoBigIntToString(right.value) === str ? right : left.flags & 16 /* Boolean */ ? left : right.flags & 16 /* Boolean */ ? str === "true" ? trueType : str === "false" ? falseType : booleanType : left.flags & 512 /* BooleanLiteral */ ? left : right.flags & 512 /* BooleanLiteral */ && right.intrinsicName === str ? right : left.flags & 32768 /* Undefined */ ? left : right.flags & 32768 /* Undefined */ && right.intrinsicName === str ? right : left.flags & 65536 /* Null */ ? left : right.flags & 65536 /* Null */ && right.intrinsicName === str ? right : left, neverType);
                                        if (!(matchingType.flags & 131072 /* Never */)) {
                                            inferFromTypes(matchingType, target2);
                                            continue;
                                        }
                                    }
                                }
                            }
                            inferFromTypes(source2, target2);
                        }
                    }
                }