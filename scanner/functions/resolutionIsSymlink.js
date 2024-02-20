function resolutionIsSymlink(resolution) {
            var _a2, _b;
            return !!(((_a2 = resolution.resolvedModule) == null ? void 0 : _a2.originalPath) || ((_b = resolution.resolvedTypeReferenceDirective) == null ? void 0 : _b.originalPath));
        }