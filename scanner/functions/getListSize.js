function getListSize() {
        const MINIMUM_SIZE = 10;
        if (typeof process.env.TIMING !== "string") {
            return MINIMUM_SIZE;
        }
        if (process.env.TIMING.toLowerCase() === "all") {
            return Number.POSITIVE_INFINITY;
        }
        const TIMING_ENV_VAR_AS_INTEGER = Number.parseInt(process.env.TIMING, 10);
        return TIMING_ENV_VAR_AS_INTEGER > 10 ? TIMING_ENV_VAR_AS_INTEGER : MINIMUM_SIZE;
    }