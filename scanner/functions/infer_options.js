async function infer_options(options) {
            try {
                await minify("", options);
            }
            catch (error) {
                return error.defs;
            }
        }