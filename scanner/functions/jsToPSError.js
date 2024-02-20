function jsToPSError(error) {
    function functionName(str) {
        
        // Remove @ suffixes from post-2021 Safari
        if (str.endsWith('@')) { str = str.substring(0, str.length - 1); }

        str = str.trim();

        if (str === 'anonymous' || str === 'eval') { str = '?'; }
        if (str !== '' && str !== '?') { str += '()'; }
        
        return str;
    }

    let lineNumber = error.lineNumber;
    let resultFcn = '?';
    let resultStack = [];

    const lineArray = compiledProgram.split('\n');
    
    // Find the first place in the user program that the problem
    // occurred.
    if (error.stack) {
        const stack = error.stack.split('\n');
        if (stack.length > 0) {
            if (isSafari) {
                // Safari doesn't give line numbers inside generated
                // code except for the top of the stack.
                for (let i = 0; i < stack.length; ++i) {
                    if (stack[i].indexOf('quadplay-runtime-') === -1) {
                        // This is the beginning of the user call stack
                        lineNumber = QRuntime.$currentLineNumber + 2;

                        let first = true;
                        while ((i < stack.length) &&
                               stack[i] !== '' &&
                               stack[i] !== 'anonymous' &&
                               stack[i].indexOf('[native') === -1) {

                            if (stack[i].indexOf('quadplay_main_loop') !== -1) {
                                resultStack.push({fcn: 'frame event'});
                                break; // while
                            } else if (first) {
                                resultFcn = functionName(stack[i]);
                                first = false;
                            } else {
                                resultStack.push({fcn: functionName(stack[i])});
                            }
                            ++i;
                        }
                        break;
                    }
                }
            } else { // not Safari

                // Entry 0 in the "stack" is actually the error message on Chromium
                // browsers, so remove it
                if (isEdge || isChrome) { stack.shift(); }

                // Search for the first user-space error
                for (let i = 0; i < stack.length; ++i) {
                    const match = stack[i].match(/(?:Function|<anonymous>):(\d+):/);

                    if (match) {
                        // Found a user-space error
                        lineNumber = parseInt(match[1]);

                        // Parse the function name
                        resultFcn = stack[i].match(/^(?:[ \t]*(?:at[ \t]+)?)([^\.\n \n\(\):@\/]+)/);
                        resultFcn = resultFcn ? functionName(resultFcn[1]) : '?';

                        // Read from here until the bottom of the user stack
                        ++i;
                        while (i < stack.length) {
                            const match = stack[i].match(/(?:Function|<anonymous>):(\d+):/);
                            if (! match) { break; }

                            // Parse the function name
                            let fcn = stack[i].match(/^(?:[ \t]*(?:at[ \t]+)?)([^\.\n \n\(\):@\/]+)/);
                            fcn = fcn ? fcn[1] : '?';
                            let done = false;

                            if (fcn === 'anonymous') {
                                fcn = '?';
                                done = true;
                            } else if (stack[i].indexOf('quadplay_main_loop') !== -1) {
                                fcn = 'frame event';
                                done = true;
                            } else if (fcn === 'eval') {
                                break;
                            } else {
                                fcn = functionName(fcn);
                            }

                            // Convert line numbers
                            const stackEntry = jsToPyxlLineNumber(parseInt(match[1]), lineArray);

                            resultStack.push({url: stackEntry.url, lineNumber: stackEntry.lineNumber, fcn: fcn});
                            if (done) { break; }
                            ++i;
                        }
                        
                        break;
                    }
                } // for stack frame
            } // if Safari
        } // if the stack trace is non-empty
    } // if there is a stack trace

    if (! lineNumber && error.lineNumber) {
        // Safari
        lineNumber = error.lineNumber + 1;
    }
    
    if (! lineNumber && error.stack) {
        // Chrome
        const match = error.stack.match(/Function|<anonymous>:(\d+)/);
        if (match) {
            lineNumber = clamp(1, parseInt(match[1]), programNumLines);
        }
    }

    if ((error.stack &&
        (error.stack.indexOf('<anonymous>') === -1) &&
         (error.stack.indexOf('Function') === -1) &&
         (error.stack.indexOf('quadplay-runtime-') !== -1)) ||
        ! lineNumber) {
        return {url:'(?)', lineNumber: '(?)', message: '' + error, stack: resultStack, fcn: resultFcn};
    }

    const result = jsToPyxlLineNumber(lineNumber, lineArray);

    
    // Modify event names to include the mode
    if (resultFcn[0] === '$') {
        resultFcn = shortURL(result.url).replace(/\..*/, '.') + resultFcn.substring(1);
    }

    return {
        url: result.url,
        lineNumber: result.lineNumber,
        fcn: resultFcn,
        message: error.message.replace(/\bundefined\b/g, 'nil').replace(/&&/g, 'and').replace(/\|\|/g, 'or').replace(/===/g, '==').replace(/!==/g, '!='),
        stack: resultStack
    };
}