function getApplicableRefactors(context) {
            return arrayFrom(flatMapIterator(refactors.values(), (refactor) => {
                var _a2;
                return context.cancellationToken && context.cancellationToken.isCancellationRequested() || !((_a2 = refactor.kinds) == null ? void 0 : _a2.some((kind) => refactorKindBeginsWith(kind, context.kind))) ? void 0 : refactor.getAvailableActions(context);
            }));
        }