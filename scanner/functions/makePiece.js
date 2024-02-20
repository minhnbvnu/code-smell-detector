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