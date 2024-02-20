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