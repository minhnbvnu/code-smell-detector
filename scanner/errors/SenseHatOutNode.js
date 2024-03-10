                lines.forEach(function(line) {
                    command = null;
                    if ( /^(([0-7]|\*|[0-7]-[0-7]),([0-7]|\*|[0-7]-[0-7]),(\d{1,3},\d{1,3},\d{1,3}|#[a-f0-9]{3,6}|[a-z]+))(,([0-7]|\*|[0-7]-[0-7]),([0-7]|\*|[0-7]-[0-7]),(\d{1,3},\d{1,3},\d{1,3}|#[a-f0-9]{3,6}|[a-z]+))*$/i.test(line)) {
                        parts = line.split(",");
                        var expanded = [];
                        var i=0;
                        var j=0;
                        while (i<parts.length) {
                            var x = parts[i++];
                            var y = parts[i++];
                            col = parts[i++];
                            if (/#[a-f0-9]{3,6}|[a-z]/i.test(col)) {
                                col = colours.getRGB(col);
                                if (col === null) {
                                    // invalid colour, go no further
                                    return;
                                }
                            } else {
                                col += ","+parts[i++]+","+parts[i++];
                            }
                            if (x === '*') {
                                x = "0-7";
                            }
                            if (y === '*') {
                                y = "0-7";
                            }
                            var x0,x1;
                            var y0,y1;
                            if (x.indexOf("-") === -1) {
                                x0 = x1 = parseInt(x);
                            } else {
                                var px = x.split("-");
                                x0 = parseInt(px[0]);
                                x1 = parseInt(px[1]);
                                if (x1<x0) {
                                    j = x1;
                                    x1 = x0;
                                    x0 = j;
                                }
                            }
                            if (y.indexOf("-") === -1) {
                                y0 = y1 = parseInt(y);
                            } else {
                                var py = y.split("-");
                                y0 = parseInt(py[0]);
                                y1 = parseInt(py[1]);
                                if (y1<y0) {
                                    j = y1;
                                    y1 = y0;
                                    y0 = j;
                                }
                            }
                            x = x0;
                            while (x<=x1) {
                                y = y0;
                                while (y<=y1) {
                                    expanded.push([x,y,col]);
                                    y++;
                                }
                                x++;
                            }
                        }
                        if (expanded.length > 0) {
                            var pixels = {};
                            var rules = [];
                            for (i=expanded.length-1; i>=0; i--) {
                                var rule = expanded[i];
                                if (!pixels[rule[0]+","+rule[1]]) {
                                    rules.unshift(rule.join(","));
                                    currentDisplay[Number(rule[1])][Number(rule[0])] = rule[2];
                                    pixels[rule[0]+","+rule[1]] = true;
                                }
                            }
                            if (rules.length > 0) {
                                command = "P"+rules.join(",");
                            }
                        }
                    }


                    if (!command) {
                        if (/^R(0|90|180|270)$/i.test(line)) {
                            command = line.toUpperCase();
                            currentRotation = command;
                        } else if (/^F(H|V)$/i.test(line)) {
                            command = line.toUpperCase();
                            if (command === 'FH') {
                                currentFlipH = !currentFlipH;
                            } else {
                                currentFlipV = !currentFlipV;
                            }
                        } else if (/^D(0|1)$/i.test(line)) {
                            command = line.toUpperCase();
                        } else {
                            command = handleTextMessage(line,msg);
                        }
                    }
                    if (command) {
                        //console.log(command);
                        HAT.send(command);
                    }
                });