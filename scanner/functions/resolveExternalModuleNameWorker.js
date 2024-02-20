function resolveExternalModuleNameWorker(location, moduleReferenceExpression, moduleNotFoundError, isForAugmentation = false) {
                return isStringLiteralLike(moduleReferenceExpression) ? resolveExternalModule(location, moduleReferenceExpression.text, moduleNotFoundError, moduleReferenceExpression, isForAugmentation) : void 0;
            }