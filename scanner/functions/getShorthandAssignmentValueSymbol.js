function getShorthandAssignmentValueSymbol(location) {
                if (location && location.kind === 300 /* ShorthandPropertyAssignment */) {
                    return resolveEntityName(location.name, 111551 /* Value */ | 2097152 /* Alias */);
                }
                return void 0;
            }