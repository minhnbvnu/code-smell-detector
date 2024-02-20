function addToAffectedFilesPendingEmit(state, affectedFilePendingEmit, kind) {
            var _a2, _b;
            const existingKind = ((_a2 = state.affectedFilesPendingEmit) == null ? void 0 : _a2.get(affectedFilePendingEmit)) || 0 /* None */;
            ((_b = state.affectedFilesPendingEmit) != null ? _b : state.affectedFilesPendingEmit = /* @__PURE__ */ new Map()).set(affectedFilePendingEmit, existingKind | kind);
        }