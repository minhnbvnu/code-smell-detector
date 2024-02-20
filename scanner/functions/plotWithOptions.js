function plotWithOptions() {
                    $.plot($("#chart_5"), [d1, d2, d3], {
                        series: {
                            stack: stack,
                            lines: {
                                show: lines,
                                fill: true,
                                steps: steps
                            },
                            bars: {
                                show: bars,
                                barWidth: 0.6
                            }
                        }
                    });
                }