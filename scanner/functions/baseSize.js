function baseSize() {
                var rect = scope_Base.getBoundingClientRect();
                var alt = ("offset" + ["Width", "Height"][options.ort]);
                return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
            }