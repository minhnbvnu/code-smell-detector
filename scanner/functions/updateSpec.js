function updateSpec(spec) {
            var cleanSpec = toStr(spec).replace(/\t/g, "  ");
            if (typeof spec === "string") {
                return {
                    type: UPDATE_SPEC,
                    payload: cleanSpec
                }
            }
        }