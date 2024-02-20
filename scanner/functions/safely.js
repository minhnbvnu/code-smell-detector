function safely(fn, silent = false) {
        try {
            return fn();
        }
        catch (error) {
            const text = error instanceof Error && error.stack != null ? error.stack : `${error}`;
            _burst_into_flames(text);
            if (!silent)
                throw error;
            else
                return;
        }
    }