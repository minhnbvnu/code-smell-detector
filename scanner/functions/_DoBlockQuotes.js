function _DoBlockQuotes(text) {

            /*
            text = text.replace(/
                (                           // Wrap whole match in $1
                    (
                        ^[ \t]*>[ \t]?      // '>' at the start of a line
                        .+\n                // rest of the first line
                        (.+\n)*             // subsequent consecutive lines
                        \n*                 // blanks
                    )+
                )
            /gm, function(){...});
            */

            text = text.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,
                function (wholeMatch, m1) {
                    var bq = m1;

                    // attacklab: hack around Konqueror 3.5.4 bug:
                    // "----------bug".replace(/^-/g,"") == "bug"

                    bq = bq.replace(/^[ \t]*>[ \t]?/gm, "~0"); // trim one level of quoting

                    // attacklab: clean up hack
                    bq = bq.replace(/~0/g, "");

                    bq = bq.replace(/^[ \t]+$/gm, "");     // trim whitespace-only lines
                    bq = _RunBlockGamut(bq);             // recurse

                    bq = bq.replace(/(^|\n)/g, "$1  ");
                    // These leading spaces screw with <pre> content, so we need to fix that:
                    bq = bq.replace(
                            /(\s*<pre>[^\r]+?<\/pre>)/gm,
                        function (wholeMatch, m1) {
                            var pre = m1;
                            // attacklab: hack around Konqueror 3.5.4 bug:
                            pre = pre.replace(/^  /mg, "~0");
                            pre = pre.replace(/~0/g, "");
                            return pre;
                        });

                    return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
                }
            );
            return text;
        }