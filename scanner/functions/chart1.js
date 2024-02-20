function chart1() {
                var d1 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.25)
                    d1.push([i, Math.sin(i)]);

                var d2 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.25)
                    d2.push([i, Math.cos(i)]);

                var d3 = [];
                for (var i = 0; i < Math.PI * 2; i += 0.1)
                    d3.push([i, Math.tan(i)]);

                $.plot($("#chart_1"), [{
                        label: "sin(x)",
                        data: d1
                    }, {
                        label: "cos(x)",
                        data: d2
                    }, {
                        label: "tan(x)",
                        data: d3
                    }
                ], {
                    series: {
                        lines: {
                            show: true
                        },
                        points: {
                            show: true
                        }
                    },
                    xaxis: {
                        ticks: [0, [Math.PI / 2, "\u03c0/2"],
                            [Math.PI, "\u03c0"],
                            [Math.PI * 3 / 2, "3\u03c0/2"],
                            [Math.PI * 2, "2\u03c0"]
                        ]
                    },
                    yaxis: {
                        ticks: 10,
                        min: -2,
                        max: 2
                    },
                    grid: {
                        backgroundColor: {
                            colors: ["#fff", "#eee"]
                        }
                    }
                });

            }