function updateResolutionField(to, value) {
            if (!(value == null ? void 0 : value.length))
                return to;
            if (!(to == null ? void 0 : to.length))
                return value;
            to.push(...value);
            return to;
        }