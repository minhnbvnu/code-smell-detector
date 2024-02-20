function processThresholds(plot, s, datapoints) {
            if (!s.threshold)
                return;
            
            if (s.threshold instanceof Array) {
                s.threshold.sort(function(a, b) {
                    return a.below - b.below;
                });
                
                $(s.threshold).each(function(i, th) {
                    thresholdData(plot, s, datapoints, th.below, th.color);
                });
            }
            else {
                thresholdData(plot, s, datapoints, s.threshold.below, s.threshold.color);
            }
        }