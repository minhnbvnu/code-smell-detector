function addBottomPoints (s, datapoints) {
            var formattedPoints = [];
            for (var i = 0; i < datapoints.points.length; i += 2) {
                formattedPoints.push(datapoints.points[i]);
                formattedPoints.push(datapoints.points[i + 1]);
                formattedPoints.push(0);
            }

            datapoints.format.push({
                x: false,
                y: true,
                number: true,
                required: false,
                computeRange: s.yaxis.options.autoScale !== 'none',
                defaultValue: 0
            });
            datapoints.points = formattedPoints;
            datapoints.pointsize = 3;
        }