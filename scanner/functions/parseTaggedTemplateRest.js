function parseTaggedTemplateRest(pos, tag, questionDotToken, typeArguments) {
                        const tagExpression = factory2.createTaggedTemplateExpression(tag, typeArguments, token() === 14 /* NoSubstitutionTemplateLiteral */ ? (reScanTemplateHeadOrNoSubstitutionTemplate(), parseLiteralNode()) : parseTemplateExpression(
                        /*isTaggedTemplate*/
                        true));
                        if (questionDotToken || tag.flags & 32 /* OptionalChain */) {
                            tagExpression.flags |= 32 /* OptionalChain */;
                        }
                        tagExpression.questionDotToken = questionDotToken;
                        return finishNode(tagExpression, pos);
                    }