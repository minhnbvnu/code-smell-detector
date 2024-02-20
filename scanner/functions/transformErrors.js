function transformErrors(errors, system) {
            var inputs = {
                jsSpec: system.specSelectors.specJson().toJS()
            };
            var transformedErrors = (0, _reduce2.default)(errorTransformers, function(result, transformer) {
                try {
                    var newlyTransformedErrors = transformer.transform(result, inputs);
                    return newlyTransformedErrors.filter(function(err) {
                        return !!err
                    })
                } catch (e) {
                    console.error("Transformer error:", e);
                    return result
                }
            }, errors);
            return transformedErrors.filter(function(err) {
                return !!err
            }).map(function(err) {
                if (!err.get("line") && err.get("path")) {}
                return err
            })
        }