function processJSDocParameterTag(tag) {
                    if (tag.isNameFirst) {
                        pushCommentRange(pos, tag.name.pos - pos);
                        pushClassification(tag.name.pos, tag.name.end - tag.name.pos, 17 /* parameterName */);
                        pos = tag.name.end;
                    }
                    if (tag.typeExpression) {
                        pushCommentRange(pos, tag.typeExpression.pos - pos);
                        processElement(tag.typeExpression);
                        pos = tag.typeExpression.end;
                    }
                    if (!tag.isNameFirst) {
                        pushCommentRange(pos, tag.name.pos - pos);
                        pushClassification(tag.name.pos, tag.name.end - tag.name.pos, 17 /* parameterName */);
                        pos = tag.name.end;
                    }
                }