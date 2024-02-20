function insertAxisLabels() {
            placeholder.find(".tickLabels").remove();
            
            var html = ['<div class="tickLabels" style="font-size:smaller">'];

            var axes = allAxes();
            for (var j = 0; j < axes.length; ++j) {
                var axis = axes[j], box = axis.box;
                if (!axis.show)
                    continue;
                //debug: html.push('<div style="position:absolute;opacity:0.10;background-color:red;left:' + box.left + 'px;top:' + box.top + 'px;width:' + box.width +  'px;height:' + box.height + 'px"></div>')
                html.push('<div class="' + axis.direction + 'Axis ' + axis.direction + axis.n + 'Axis" style="color:' + axis.options.color + '">');
                for (var i = 0; i < axis.ticks.length; ++i) {
                    var tick = axis.ticks[i];
                    if (!tick.label || tick.v < axis.min || tick.v > axis.max)
                        continue;

                    var pos = {}, align;
                    
                    if (axis.direction == "x") {
                        align = "center";
                        pos.left = Math.round(plotOffset.left + axis.p2c(tick.v) - axis.labelWidth/2);
                        if (axis.position == "bottom")
                            pos.top = box.top + box.padding;
                        else
                            pos.bottom = canvasHeight - (box.top + box.height - box.padding);
                    }
                    else {
                        pos.top = Math.round(plotOffset.top + axis.p2c(tick.v) - axis.labelHeight/2);
                        if (axis.position == "left") {
                            pos.right = canvasWidth - (box.left + box.width - box.padding)
                            align = "right";
                        }
                        else {
                            pos.left = box.left + box.padding;
                            align = "left";
                        }
                    }

                    pos.width = axis.labelWidth;

                    var style = ["position:absolute", "text-align:" + align ];
                    for (var a in pos)
                        style.push(a + ":" + pos[a] + "px")
                    
                    html.push('<div class="tickLabel" style="' + style.join(';') + '">' + tick.label + '</div>');
                }
                html.push('</div>');
            }

            html.push('</div>');

            placeholder.append(html.join(""));
        }