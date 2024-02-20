function mapToRange(values, stepped) {
                return values.map(function (value) {
                    return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                });
            }