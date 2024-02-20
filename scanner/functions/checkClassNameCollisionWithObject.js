function checkClassNameCollisionWithObject(name) {
                if (languageVersion >= 1 /* ES5 */ && name.escapedText === "Object" && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(name).impliedNodeFormat === 1 /* CommonJS */)) {
                    error(name, Diagnostics.Class_name_cannot_be_Object_when_targeting_ES5_with_module_0, ModuleKind[moduleKind]);
                }
            }