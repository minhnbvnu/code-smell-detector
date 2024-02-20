function drawPunchCard(buckets) {
        var i, j,
            maxCommitCnt = 0,
            days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            canvas = $('#canvas_card'),
            context = canvas[0].getContext('2d'),
            width = canvas.width(),
            height = canvas.height(),
            widthInt = width / 26,
            heightInt = height / 9;
        for (i = 0; i < buckets.length; i += 1) {
            for (j = 0; j < buckets[i].length; j += 1) {
                if (buckets[i][j] > maxCommitCnt) {
                    maxCommitCnt = buckets[i][j];
                }
            }
        }
        maxCommitCnt += 1e-6;
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        for (i = 0; i < days.length; i += 1) {
            context.fillText(days[i], widthInt, heightInt * (i + 1));
        }
        for (j = 0; j < 24; j += 1) {
            context.fillText(j, widthInt * (j + 2), heightInt * 8);
        }
        for (i = 0; i < buckets.length; i += 1) {
            for (j = 0; j < buckets[i].length; j += 1) {
                if (buckets[i][j] !== 0) {
                    context.beginPath();
                    context.arc(
                        widthInt * (j + 2),
                        heightInt * (i + 1),
                        Math.min(widthInt, heightInt) * 0.45 * Math.sqrt(buckets[i][j] / maxCommitCnt),
                        0,
                        2 * Math.PI
                    );
                    context.fillStyle = 'rgba(0, 0, 0, ' + (0.4 + 0.6 * buckets[i][j] / maxCommitCnt) + ')';
                    context.fill();
                }
            }
        }
    }