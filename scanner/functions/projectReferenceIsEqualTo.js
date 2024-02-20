function projectReferenceIsEqualTo(oldRef, newRef) {
            return oldRef.path === newRef.path && !oldRef.prepend === !newRef.prepend && !oldRef.circular === !newRef.circular;
        }