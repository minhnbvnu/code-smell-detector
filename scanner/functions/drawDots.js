function drawDots(i, series) {
        var g = svg.append('g')
            .attr('class', 'chart-dots');

        var circle = g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .style('fill', colors(i))
            .attr('cx', function (d) {
                return x(d[options.xAxis]);
            })
            .attr('cy', function (d) {
                return y(d[series]);
            })
            .attr('r', 4);

        Xhgui.tooltip(container, {
            bindTo: circle,
            positioner: function (d, i) {
                var x, y;

                x = this.cx.baseVal.value;
                y = this.cy.baseVal.value;
                x += margin.left - 7;
                y += 7;
                return {x: x, y: y};
            },

            formatter: function (d, i) {
                var value = '';
                var xValue = d[options.xAxis];
                value += '<strong>';
                if (xValue instanceof Date) {
                    value += Xhgui.formatDate(xValue);
                } else {
                    value += xValue;
                }
                value += '</strong>';
                value += '<br />';
                value += Xhgui.formatNumber(d[series], 0);
                if (options.postfix) {
                    value += options.postfix;
                }
                return value;
            }
        });
    }