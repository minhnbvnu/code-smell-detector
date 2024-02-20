function SenseHatOutNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        node.status({fill:"red",shape:"ring",text:"node-red:common.status.disconnected"});

        HAT.open(this);

        node.on("close", function(done) {
            HAT.close(this,done);
        });
        var handleTextMessage = function(line,msg) {
            var textCol = colours.getRGB(msg.color||msg.colour)||"255,255,255";
            var backCol = colours.getRGB(msg.background)||"0,0,0";
            var speed = null;
            if (!isNaN(msg.speed)) {
                speed = msg.speed;
            }
            var command = "T";
            if (textCol) {
                command += textCol;
                if (backCol) {
                    command += ","+backCol;
                }
            }

            if (speed) {
                var s = parseInt(speed);
                if (s >= 1 && s <= 5) {
                    s = 0.1 + (3-s)*0.03;
                }
                command = command + ((command.length === 1)?"":",") + s;
            }
            command += ":" + line;
            return command;
        }

        node.on("input",function(msg) {
            var command;
            var parts;
            var col;
            if (typeof msg.payload === 'number') {
                HAT.send(handleTextMessage(""+msg.payload,msg));
            } else if (typeof msg.payload === 'string') {
                var lines = msg.payload.split("\n");
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
            }
        });
    }