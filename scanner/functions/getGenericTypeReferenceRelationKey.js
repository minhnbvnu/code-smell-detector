function getGenericTypeReferenceRelationKey(source, target, postFix, ignoreConstraints) {
                const typeParameters = [];
                let constraintMarker = "";
                const sourceId = getTypeReferenceId(source, 0);
                const targetId = getTypeReferenceId(target, 0);
                return `${constraintMarker}${sourceId},${targetId}${postFix}`;
                function getTypeReferenceId(type, depth = 0) {
                    let result = "" + type.target.id;
                    for (const t of getTypeArguments(type)) {
                        if (t.flags & 262144 /* TypeParameter */) {
                            if (ignoreConstraints || isUnconstrainedTypeParameter(t)) {
                                let index = typeParameters.indexOf(t);
                                if (index < 0) {
                                    index = typeParameters.length;
                                    typeParameters.push(t);
                                }
                                result += "=" + index;
                                continue;
                            }
                            constraintMarker = "*";
                        }
                        else if (depth < 4 && isTypeReferenceWithGenericArguments(t)) {
                            result += "<" + getTypeReferenceId(t, depth + 1) + ">";
                            continue;
                        }
                        result += "-" + t.id;
                    }
                    return result;
                }
            }