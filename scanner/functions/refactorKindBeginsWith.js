function refactorKindBeginsWith(known, requested) {
            if (!requested)
                return true;
            return known.substr(0, requested.length) === requested;
        }