function addMarking(spread, filterFunc, formatter) {
                var _a, _b;
                var element = scope_Document.createElement("div");
                var valueSizeClasses = (_a = {},
                    _a[exports.PipsType.None] = "",
                    _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal,
                    _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge,
                    _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub,
                    _a);
                var markerSizeClasses = (_b = {},
                    _b[exports.PipsType.None] = "",
                    _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal,
                    _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge,
                    _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub,
                    _b);
                var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
                var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];
                addClass(element, options.cssClasses.pips);
                addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
                function getClasses(type, source) {
                    var a = source === options.cssClasses.value;
                    var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                    var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                    return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
                }
                function addSpread(offset, value, type) {
                    // Apply the filter function, if it is set.
                    type = filterFunc ? filterFunc(value, type) : type;
                    if (type === exports.PipsType.None) {
                        return;
                    }
                    // Add a marker for every point
                    var node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.marker);
                    node.style[options.style] = offset + "%";
                    // Values are only appended for points marked '1' or '2'.
                    if (type > exports.PipsType.NoValue) {
                        node = addNodeTo(element, false);
                        node.className = getClasses(type, options.cssClasses.value);
                        node.setAttribute("data-value", String(value));
                        node.style[options.style] = offset + "%";
                        node.innerHTML = String(formatter.to(value));
                    }
                }
                // Append all points.
                Object.keys(spread).forEach(function (offset) {
                    addSpread(offset, spread[offset][0], spread[offset][1]);
                });
                return element;
            }