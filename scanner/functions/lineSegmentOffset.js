function lineSegmentOffset(segmentLength) {

            var c = Math.sqrt(Math.pow(ax2 - ax1, 2) + Math.pow(ay2 - ay1, 2));

            if (c <= segmentLength) {
              return {
                deltaX: ax2 - ax1,
                deltaY: ay2 - ay1,
                distance: c,
                remainder: segmentLength - c
              }
            } else {
              var xsign = ax2 > ax1 ? 1 : -1,
                  ysign = ay2 > ay1 ? 1 : -1;
              return {
                deltaX: xsign * Math.sqrt(Math.pow(segmentLength, 2) / (1 + Math.pow((ay2 - ay1)/(ax2 - ax1), 2))),
                deltaY: ysign * Math.sqrt(Math.pow(segmentLength, 2) - Math.pow(segmentLength, 2) / (1 + Math.pow((ay2 - ay1)/(ax2 - ax1), 2))),
                distance: segmentLength,
                remainder: 0
              };
            }
          }