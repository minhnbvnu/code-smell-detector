function drawAllTime (key, num) {
            if (!that.interval) {
                that.choose = true;
                var floatTag = that.floatTag;

                for (var j = 0, l = dotBubbleSet.length; j < l ; j++) {
                    if (j !== num) {
                        dotBubbleSet[j].attr({"stroke-width": 0, "fill-opacity": 0.2});
                    }
                }

                meshes.attr({"stroke": "#d6d6d6", "stroke-dasharray": "-"});
                var i;

                for (i = 0, l = timeKeys.length; i < l; i++) {
                    (function (i) {
                        var x0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.xDimen, key)),
                            y0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.yDimen, key)),
                            r0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.sizeDimen, key)),
                            c0 = that.getColorData(key),
                            x = that.x[that.xDimen](x0) - margin[3],
                            y = that.y[that.yDimen](y0),
                            r = that.z[that.sizeDimen](r0),
                            c = that.c[that.colorDimen](c0),
                            fOpacity = 0.1 + Math.pow(1.5, i)/Math.pow(1.5, l);
                        var historyBubble = foreCanvas.circle(x, y, r);
                        historyBubble.attr({"stroke-width": 0, "fill": c, "fill-opacity": fOpacity});

                        if (timeKeys[i] === Math.ceil(time)) {
                            historyBubble.attr({"stroke-width": 1, "stroke": "#f00"});
                            historyBubble.hover(function () {
                                floatTag.html(that.getTip(key, i)).css(conf.tipStyle);
                                floatTag.css({"visibility" : "visible"});
                            }, function () {
                                floatTag.css({"visibility" : "hidden"});
                            });
                        } else {
                            historyBubble.hover(function () {
                                this.attr({"stroke-width": 1, "stroke": "#f00"});
                                floatTag.html(that.getTip(key, i)).css(conf.tipStyle);
                                floatTag.css({"visibility" : "visible"});
                            }, function () {
                                this.attr({"stroke-width": 0});
                                floatTag.css({"visibility" : "hidden"});
                            });
                        }

                        historyBubble.click(function () {
                            that.generatePaths(Math.ceil(time));
                            that.choose = false;
                        });

                    }(i));
                }

                var skeletonLineSet = foreCanvas.set();
                for (i = 1, l = timeKeys.length; i < l; i++) {
                    var x0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.xDimen, key)),
                        y0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.yDimen, key)),
                        x = that.x[that.xDimen](x0) - margin[3],
                        y = that.y[that.yDimen](y0),
                        x1 = that.interpolateData(timeKeys[i-1], timeKeys, that.getKeyData(that.xDimen, key)),
                        y1 = that.interpolateData(timeKeys[i-1], timeKeys, that.getKeyData(that.yDimen, key)),
                        x2 = that.x[that.xDimen](x1) - margin[3],
                        y2 = that.y[that.yDimen](y1);
                    var skeletonLine = foreCanvas.path("M"+x2+" "+y2+"L"+x+" "+y);
                        skeletonLine.attr(conf.skeletonLineAttr);
                        skeletonLineSet.push(skeletonLine);
                }

                var skeletonCircleSet = foreCanvas.set();
                for (i = 0, l = timeKeys.length; i < l; i++) {
                    (function (i) {
                        var x0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.xDimen, key)),
                            y0 = that.interpolateData(timeKeys[i], timeKeys, that.getKeyData(that.yDimen, key)),
                            c0 = that.getColorData(key),
                            x = that.x[that.xDimen](x0) - margin[3],
                            y = that.y[that.yDimen](y0),
                            c = that.c[that.colorDimen](c0);

                        var skeletonCircle = foreCanvas.circle(x,y,skeletonRadius);
                        skeletonCircle.attr(conf.skeletonCircleAttr).attr({"stroke": c});
                        skeletonCircleSet.push(skeletonCircle);

                        if (timeKeys[i] === Math.ceil(time)) {
                            skeletonCircle.attr({"fill": "#f00"});
                            skeletonCircle.click(function () {
                                that.generatePaths(Math.ceil(time));
                            });
                            skeletonCircle.hover(function () {
                                floatTag.html(that.getTip(key, i)).css(conf.tipStyle);
                                floatTag.css({"visibility" : "visible"});
                                skeletonCircleSet.attr({"fill-opacity": 0.35});
                                this.attr({"fill-opacity": 1, "r": 5});
                                skeletonLineSet.attr({"opacity": 0.35});
                            }, function () {
                                floatTag.css({"visibility" : "hidden"});
                                this.attr(conf.dotStrokeColor);
                                skeletonCircleSet.attr({"fill-opacity": 0.7});
                                this.attr({"r": skeletonRadius});
                                // meshes.attr({"stroke": "#ebebeb", "stroke-dasharray": "-"});
                                skeletonLineSet.attr({"opacity": 0.7});
                            });
                        } else {
                            skeletonCircle.hover(function () {
                                floatTag.html(that.getTip(key, i)).css(conf.tipStyle);
                                floatTag.css({"visibility" : "visible"});
                                skeletonCircleSet.attr({"fill-opacity": 0.35});
                                this.attr({"fill-opacity": 1, "r": 5});
                                skeletonLineSet.attr({"opacity": 0.35});
                            }, function () {
                                floatTag.css({"visibility" : "hidden"});
                                this.attr(conf.dotStrokeColor);
                                skeletonCircleSet.attr({"fill-opacity": 0.7});
                                this.attr({"r": skeletonRadius});
                                skeletonLineSet.attr({"opacity": 0.7});
                            });
                        }
                    }(i));
                }
            }
        }