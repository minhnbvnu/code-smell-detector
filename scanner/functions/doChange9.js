function doChange9(changes, sourceFile, namedTupleMember) {
            if (!namedTupleMember) {
                return;
            }
            let unwrappedType = namedTupleMember.type;
            let sawOptional = false;
            let sawRest = false;
            while (unwrappedType.kind === 187 /* OptionalType */ || unwrappedType.kind === 188 /* RestType */ || unwrappedType.kind === 193 /* ParenthesizedType */) {
                if (unwrappedType.kind === 187 /* OptionalType */) {
                    sawOptional = true;
                }
                else if (unwrappedType.kind === 188 /* RestType */) {
                    sawRest = true;
                }
                unwrappedType = unwrappedType.type;
            }
            const updated = factory.updateNamedTupleMember(namedTupleMember, namedTupleMember.dotDotDotToken || (sawRest ? factory.createToken(25 /* DotDotDotToken */) : void 0), namedTupleMember.name, namedTupleMember.questionToken || (sawOptional ? factory.createToken(57 /* QuestionToken */) : void 0), unwrappedType);
            if (updated === namedTupleMember) {
                return;
            }
            changes.replaceNode(sourceFile, namedTupleMember, updated);
        }