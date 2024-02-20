function enableDebugInfo() {
                        if (isDebugInfoEnabled)
                            return;
                        const weakTypeTextMap = /* @__PURE__ */ new WeakMap();
                        const weakNodeTextMap = /* @__PURE__ */ new WeakMap();
                        Object.defineProperties(objectAllocator.getSymbolConstructor().prototype, {
                            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                            __tsDebuggerDisplay: {
                                value() {
                                    const symbolHeader = this.flags & 33554432 /* Transient */ ? "TransientSymbol" : "Symbol";
                                    const remainingSymbolFlags = this.flags & ~33554432 /* Transient */;
                                    return `${symbolHeader} '${symbolName(this)}'${remainingSymbolFlags ? ` (${formatSymbolFlags(remainingSymbolFlags)})` : ""}`;
                                }
                            },
                            __debugFlags: { get() {
                                    return formatSymbolFlags(this.flags);
                                } }
                        });
                        Object.defineProperties(objectAllocator.getTypeConstructor().prototype, {
                            // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                            __tsDebuggerDisplay: {
                                value() {
                                    const typeHeader = this.flags & 98304 /* Nullable */ ? "NullableType" : this.flags & 384 /* StringOrNumberLiteral */ ? `LiteralType ${JSON.stringify(this.value)}` : this.flags & 2048 /* BigIntLiteral */ ? `LiteralType ${this.value.negative ? "-" : ""}${this.value.base10Value}n` : this.flags & 8192 /* UniqueESSymbol */ ? "UniqueESSymbolType" : this.flags & 32 /* Enum */ ? "EnumType" : this.flags & 67359327 /* Intrinsic */ ? `IntrinsicType ${this.intrinsicName}` : this.flags & 1048576 /* Union */ ? "UnionType" : this.flags & 2097152 /* Intersection */ ? "IntersectionType" : this.flags & 4194304 /* Index */ ? "IndexType" : this.flags & 8388608 /* IndexedAccess */ ? "IndexedAccessType" : this.flags & 16777216 /* Conditional */ ? "ConditionalType" : this.flags & 33554432 /* Substitution */ ? "SubstitutionType" : this.flags & 262144 /* TypeParameter */ ? "TypeParameter" : this.flags & 524288 /* Object */ ? this.objectFlags & 3 /* ClassOrInterface */ ? "InterfaceType" : this.objectFlags & 4 /* Reference */ ? "TypeReference" : this.objectFlags & 8 /* Tuple */ ? "TupleType" : this.objectFlags & 16 /* Anonymous */ ? "AnonymousType" : this.objectFlags & 32 /* Mapped */ ? "MappedType" : this.objectFlags & 1024 /* ReverseMapped */ ? "ReverseMappedType" : this.objectFlags & 256 /* EvolvingArray */ ? "EvolvingArrayType" : "ObjectType" : "Type";
                                    const remainingObjectFlags = this.flags & 524288 /* Object */ ? this.objectFlags & ~1343 /* ObjectTypeKindMask */ : 0;
                                    return `${typeHeader}${this.symbol ? ` '${symbolName(this.symbol)}'` : ""}${remainingObjectFlags ? ` (${formatObjectFlags(remainingObjectFlags)})` : ""}`;
                                }
                            },
                            __debugFlags: { get() {
                                    return formatTypeFlags(this.flags);
                                } },
                            __debugObjectFlags: { get() {
                                    return this.flags & 524288 /* Object */ ? formatObjectFlags(this.objectFlags) : "";
                                } },
                            __debugTypeToString: {
                                value() {
                                    let text = weakTypeTextMap.get(this);
                                    if (text === void 0) {
                                        text = this.checker.typeToString(this);
                                        weakTypeTextMap.set(this, text);
                                    }
                                    return text;
                                }
                            }
                        });
                        Object.defineProperties(objectAllocator.getSignatureConstructor().prototype, {
                            __debugFlags: { get() {
                                    return formatSignatureFlags(this.flags);
                                } },
                            __debugSignatureToString: { value() {
                                    var _a2;
                                    return (_a2 = this.checker) == null ? void 0 : _a2.signatureToString(this);
                                } }
                        });
                        const nodeConstructors = [
                            objectAllocator.getNodeConstructor(),
                            objectAllocator.getIdentifierConstructor(),
                            objectAllocator.getTokenConstructor(),
                            objectAllocator.getSourceFileConstructor()
                        ];
                        for (const ctor of nodeConstructors) {
                            if (!hasProperty(ctor.prototype, "__debugKind")) {
                                Object.defineProperties(ctor.prototype, {
                                    // for use with vscode-js-debug's new customDescriptionGenerator in launch.json
                                    __tsDebuggerDisplay: {
                                        value() {
                                            const nodeHeader = isGeneratedIdentifier(this) ? "GeneratedIdentifier" : isIdentifier(this) ? `Identifier '${idText(this)}'` : isPrivateIdentifier(this) ? `PrivateIdentifier '${idText(this)}'` : isStringLiteral(this) ? `StringLiteral ${JSON.stringify(this.text.length < 10 ? this.text : this.text.slice(10) + "...")}` : isNumericLiteral(this) ? `NumericLiteral ${this.text}` : isBigIntLiteral(this) ? `BigIntLiteral ${this.text}n` : isTypeParameterDeclaration(this) ? "TypeParameterDeclaration" : isParameter(this) ? "ParameterDeclaration" : isConstructorDeclaration(this) ? "ConstructorDeclaration" : isGetAccessorDeclaration(this) ? "GetAccessorDeclaration" : isSetAccessorDeclaration(this) ? "SetAccessorDeclaration" : isCallSignatureDeclaration(this) ? "CallSignatureDeclaration" : isConstructSignatureDeclaration(this) ? "ConstructSignatureDeclaration" : isIndexSignatureDeclaration(this) ? "IndexSignatureDeclaration" : isTypePredicateNode(this) ? "TypePredicateNode" : isTypeReferenceNode(this) ? "TypeReferenceNode" : isFunctionTypeNode(this) ? "FunctionTypeNode" : isConstructorTypeNode(this) ? "ConstructorTypeNode" : isTypeQueryNode(this) ? "TypeQueryNode" : isTypeLiteralNode(this) ? "TypeLiteralNode" : isArrayTypeNode(this) ? "ArrayTypeNode" : isTupleTypeNode(this) ? "TupleTypeNode" : isOptionalTypeNode(this) ? "OptionalTypeNode" : isRestTypeNode(this) ? "RestTypeNode" : isUnionTypeNode(this) ? "UnionTypeNode" : isIntersectionTypeNode(this) ? "IntersectionTypeNode" : isConditionalTypeNode(this) ? "ConditionalTypeNode" : isInferTypeNode(this) ? "InferTypeNode" : isParenthesizedTypeNode(this) ? "ParenthesizedTypeNode" : isThisTypeNode(this) ? "ThisTypeNode" : isTypeOperatorNode(this) ? "TypeOperatorNode" : isIndexedAccessTypeNode(this) ? "IndexedAccessTypeNode" : isMappedTypeNode(this) ? "MappedTypeNode" : isLiteralTypeNode(this) ? "LiteralTypeNode" : isNamedTupleMember(this) ? "NamedTupleMember" : isImportTypeNode(this) ? "ImportTypeNode" : formatSyntaxKind(this.kind);
                                            return `${nodeHeader}${this.flags ? ` (${formatNodeFlags(this.flags)})` : ""}`;
                                        }
                                    },
                                    __debugKind: { get() {
                                            return formatSyntaxKind(this.kind);
                                        } },
                                    __debugNodeFlags: { get() {
                                            return formatNodeFlags(this.flags);
                                        } },
                                    __debugModifierFlags: { get() {
                                            return formatModifierFlags(getEffectiveModifierFlagsNoCache(this));
                                        } },
                                    __debugTransformFlags: { get() {
                                            return formatTransformFlags(this.transformFlags);
                                        } },
                                    __debugIsParseTreeNode: { get() {
                                            return isParseTreeNode(this);
                                        } },
                                    __debugEmitFlags: { get() {
                                            return formatEmitFlags(getEmitFlags(this));
                                        } },
                                    __debugGetText: {
                                        value(includeTrivia) {
                                            if (nodeIsSynthesized(this))
                                                return "";
                                            let text = weakNodeTextMap.get(this);
                                            if (text === void 0) {
                                                const parseNode = getParseTreeNode(this);
                                                const sourceFile = parseNode && getSourceFileOfNode(parseNode);
                                                text = sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
                                                weakNodeTextMap.set(this, text);
                                            }
                                            return text;
                                        }
                                    }
                                });
                            }
                        }
                        isDebugInfoEnabled = true;
                    }