function processTypeReferenceDirective(typeReferenceDirective, mode, resolution, reason) {
                var _a3, _b2;
                (_a3 = tracing) == null ? void 0 : _a3.push(tracing.Phase.Program, "processTypeReferenceDirective", { directive: typeReferenceDirective, hasResolved: !!resolution.resolvedTypeReferenceDirective, refKind: reason.kind, refPath: isReferencedFile(reason) ? reason.file : void 0 });
                processTypeReferenceDirectiveWorker(typeReferenceDirective, mode, resolution, reason);
                (_b2 = tracing) == null ? void 0 : _b2.pop();
            }