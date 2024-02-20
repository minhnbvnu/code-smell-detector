function setEntry(entry) {
                    if (entry === undefined) entry = "";
                    if (!isStatic && (test.fn === null || testPos.input === undefined)) {
                        isStatic = true;
                        maskTemplate.push("<span class='im-static'>" + entry);
                    } else if (isStatic && (test.fn !== null && testPos.input !== undefined || test.def === "")) {
                        isStatic = false;
                        var mtl = maskTemplate.length;
                        maskTemplate[mtl - 1] = maskTemplate[mtl - 1] + "</span>";
                        maskTemplate.push(entry);
                    } else maskTemplate.push(entry);
                }