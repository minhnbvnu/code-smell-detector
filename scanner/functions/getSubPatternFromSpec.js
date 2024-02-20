function getSubPatternFromSpec(spec, basePath, usage, { singleAsteriskRegexFragment, doubleAsteriskRegexFragment, replaceWildcardCharacter: replaceWildcardCharacter2 }) {
            let subpattern = "";
            let hasWrittenComponent = false;
            const components = getNormalizedPathComponents(spec, basePath);
            const lastComponent = last(components);
            if (usage !== "exclude" && lastComponent === "**") {
                return void 0;
            }
            components[0] = removeTrailingDirectorySeparator(components[0]);
            if (isImplicitGlob(lastComponent)) {
                components.push("**", "*");
            }
            let optionalCount = 0;
            for (let component of components) {
                if (component === "**") {
                    subpattern += doubleAsteriskRegexFragment;
                }
                else {
                    if (usage === "directories") {
                        subpattern += "(";
                        optionalCount++;
                    }
                    if (hasWrittenComponent) {
                        subpattern += directorySeparator;
                    }
                    if (usage !== "exclude") {
                        let componentPattern = "";
                        if (component.charCodeAt(0) === 42 /* asterisk */) {
                            componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                            component = component.substr(1);
                        }
                        else if (component.charCodeAt(0) === 63 /* question */) {
                            componentPattern += "[^./]";
                            component = component.substr(1);
                        }
                        componentPattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter2);
                        if (componentPattern !== component) {
                            subpattern += implicitExcludePathRegexPattern;
                        }
                        subpattern += componentPattern;
                    }
                    else {
                        subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter2);
                    }
                }
                hasWrittenComponent = true;
            }
            while (optionalCount > 0) {
                subpattern += ")?";
                optionalCount--;
            }
            return subpattern;
        }