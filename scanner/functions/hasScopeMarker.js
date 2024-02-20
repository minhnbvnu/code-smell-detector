function hasScopeMarker(statements) {
            return some(statements, isScopeMarker);
        }