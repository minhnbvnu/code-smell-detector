function getScriptTransformers(compilerOptions, customTransformers, emitOnly) {
            if (emitOnly)
                return emptyArray;
            const languageVersion = getEmitScriptTarget(compilerOptions);
            const moduleKind = getEmitModuleKind(compilerOptions);
            const useDefineForClassFields = getUseDefineForClassFields(compilerOptions);
            const transformers = [];
            addRange(transformers, customTransformers && map(customTransformers.before, wrapScriptTransformerFactory));
            transformers.push(transformTypeScript);
            if (compilerOptions.experimentalDecorators) {
                transformers.push(transformLegacyDecorators);
            }
            else if (languageVersion < 99 /* ESNext */ || !useDefineForClassFields) {
                transformers.push(transformESDecorators);
            }
            transformers.push(transformClassFields);
            if (getJSXTransformEnabled(compilerOptions)) {
                transformers.push(transformJsx);
            }
            if (languageVersion < 99 /* ESNext */) {
                transformers.push(transformESNext);
            }
            if (languageVersion < 8 /* ES2021 */) {
                transformers.push(transformES2021);
            }
            if (languageVersion < 7 /* ES2020 */) {
                transformers.push(transformES2020);
            }
            if (languageVersion < 6 /* ES2019 */) {
                transformers.push(transformES2019);
            }
            if (languageVersion < 5 /* ES2018 */) {
                transformers.push(transformES2018);
            }
            if (languageVersion < 4 /* ES2017 */) {
                transformers.push(transformES2017);
            }
            if (languageVersion < 3 /* ES2016 */) {
                transformers.push(transformES2016);
            }
            if (languageVersion < 2 /* ES2015 */) {
                transformers.push(transformES2015);
                transformers.push(transformGenerators);
            }
            transformers.push(getModuleTransformer(moduleKind));
            if (languageVersion < 1 /* ES5 */) {
                transformers.push(transformES5);
            }
            addRange(transformers, customTransformers && map(customTransformers.after, wrapScriptTransformerFactory));
            return transformers;
        }