function maybeAsiHazardBefore(token) {
                return (Boolean(token) &&
                    OPT_OUT_PATTERN.test(token.value) &&
                    token.value !== "++" &&
                    token.value !== "--");
            }