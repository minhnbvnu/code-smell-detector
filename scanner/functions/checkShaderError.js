function checkShaderError(gl, shader, source, type, command) {
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                var errLog = gl.getShaderInfoLog(shader);
                var typeName = type === gl.FRAGMENT_SHADER ? 'fragment' : 'vertex';
                checkCommandType(source, 'string', typeName + ' shader source must be a string', command);
                var files = parseSource(source, command);
                var errors = parseErrorLog(errLog);
                annotateFiles(files, errors);
                Object.keys(files).forEach(function (fileNumber) {
                    var file = files[fileNumber];
                    if (!file.hasErrors) {
                        return;
                    }
                    var strings = [''];
                    var styles = [''];
                    function push(str, style) {
                        strings.push(str);
                        styles.push(style || '');
                    }
                    push('file number ' + fileNumber + ': ' + file.name + '\n', 'color:red;text-decoration:underline;font-weight:bold');
                    file.lines.forEach(function (line) {
                        if (line.errors.length > 0) {
                            push(leftPad(line.number, 4) + '|  ', 'background-color:yellow; font-weight:bold');
                            push(line.line + endl, 'color:red; background-color:yellow; font-weight:bold');
                            // try to guess token
                            var offset = 0;
                            line.errors.forEach(function (error) {
                                var message = error.message;
                                var token = /^\s*'(.*)'\s*:\s*(.*)$/.exec(message);
                                if (token) {
                                    var tokenPat = token[1];
                                    message = token[2];
                                    switch (tokenPat) {
                                        case 'assign':
                                            tokenPat = '=';
                                            break;
                                    }
                                    offset = Math.max(line.line.indexOf(tokenPat, offset), 0);
                                }
                                else {
                                    offset = 0;
                                }
                                push(leftPad('| ', 6));
                                push(leftPad('^^^', offset + 3) + endl, 'font-weight:bold');
                                push(leftPad('| ', 6));
                                push(message + endl, 'font-weight:bold');
                            });
                            push(leftPad('| ', 6) + endl);
                        }
                        else {
                            push(leftPad(line.number, 4) + '|  ');
                            push(line.line + endl, 'color:red');
                        }
                    });
                    if (typeof document !== 'undefined' && !window.chrome) {
                        styles[0] = strings.join('%c');
                        console.log.apply(console, styles);
                    }
                    else {
                        console.log(strings.join(''));
                    }
                });
                check.raise('Error compiling ' + typeName + ' shader, ' + files[0].name);
            }
        }