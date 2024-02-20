function getPattern(selector, pattern) {
        var isArray = Array.isArray(pattern),
            pieces = isArray ? pattern :  [],
            testBlank = function(el) {
                return (/^\s*$/).test($(el).text())
            },
            output = [],
            contents = $(selector).contents().toArray(),
            prevPattern;
        // quick fail
        if (!contents.length) return [];
        // set up pattern pieces
        function makePiece(piece, key) {
            if (typeof piece == 'object' && !(piece instanceof RegExp)) {
                piece.key = key;
                // inner pieces still need a pattern to match the current element
                if (piece.inner) {
                    piece.pattern = prevPattern;
                }
            } else {
                piece = {
                    key: key,
                    pattern: piece
                }
            }
            // save for inner if necessary
            prevPattern = piece.pattern;
            // set scrape function, if not supplied
            piece.scrape = piece.scrape || function(el) {
                return $(el).text().trim()
            }
            // set test function
            piece.test = piece.test || function(el) {
                return piece.pattern == "text" ? // text node
                        el.nodeType == Node.TEXT_NODE && !testBlank(el) :
                    typeof piece.pattern == "string" ? // selector
                        $(el).is(piece.pattern) :
                    piece.pattern instanceof RegExp ? // regexp
                        piece.pattern.test($(el).text()) : false;
            }
            return piece;
        }
        // convert object to array
        if (!isArray) {
            for (var key in pattern) {
                pieces.push(makePiece(pattern[key], key))
            }
        } else {
            // convert array to desired format
            pieces = pieces.map(makePiece);
        }
        // quick exit #2
        if (!pieces.length) return;
        // create a state automaton
        var state, collector;
        function reset() {
            state = 0,
            collector = isArray ? [] : {};
        }
        // save and reset if necessary
        function checkReset() {
            if (state >= pieces.length) {
                output.push(collector);
                reset();
            }
        }
        function step(el) {
            if (testBlank(el)) return;
            checkReset(); // check at the beginning for trailing optional
            var piece = pieces[state];
            // check for match
            if (piece.test(el)) {
                // hit; scrape
                if (!piece.ignore) {
                    collector[piece.key] = piece.scrape(el);
                }
                state++;
                // lookahead for inner patterns
                if (pieces[state] && pieces[state].inner) {
                    step(el);
                }
            } else if (piece.optional) {
                // optional; advance
                state++;
                step(el);
            } else if (state > 0) reset(); // miss; reset
            checkReset();
        }
        // iterate through the contents
        reset();
        contents.forEach(step);
        
        return output;
    }