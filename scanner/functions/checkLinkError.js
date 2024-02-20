function checkLinkError(gl, program, fragShader, vertShader, command) {
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                var errLog = gl.getProgramInfoLog(program);
                var fragParse = parseSource(fragShader, command);
                var vertParse = parseSource(vertShader, command);
                var header = 'Error linking program with vertex shader, "' +
                    vertParse[0].name + '", and fragment shader "' + fragParse[0].name + '"';
                if (typeof document !== 'undefined') {
                    console.log('%c' + header + endl + '%c' + errLog, 'color:red;text-decoration:underline;font-weight:bold', 'color:red');
                }
                else {
                    console.log(header + endl + errLog);
                }
                check.raise(header);
            }
        }