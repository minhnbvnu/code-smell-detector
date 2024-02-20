function toMeter(input) {
            var ratio = wkt.to_meter || 1;
            return input * ratio;
        }