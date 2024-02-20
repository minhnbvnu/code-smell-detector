function _DoImages(text) {
            //
            // Turn Markdown image shortcuts into <img> tags.
            //

            //
            // First, handle reference-style labeled images: ![alt text][id]
            //

            /*
            text = text.replace(/
                (                   // wrap whole match in $1
                    !\[
                    (.*?)           // alt text = $2
                    \]

                    [ ]?            // one optional space
                    (?:\n[ ]*)?     // one optional newline followed by spaces

                    \[
                    (.*?)           // id = $3
                    \]
                )
                ()()()()            // pad rest of backreferences
            /g, writeImageTag);
            */
            text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, writeImageTag);

            //
            // Next, handle inline images:  ![alt text](url "optional title")
            // Don't forget: encode * and _

            /*
            text = text.replace(/
                (                   // wrap whole match in $1
                    !\[
                    (.*?)           // alt text = $2
                    \]
                    \s?             // One optional whitespace character
                    \(              // literal paren
                    [ \t]*
                    ()              // no id, so leave $3 empty
                    <?(\S+?)>?      // src url = $4
                    [ \t]*
                    (               // $5
                        (['"])      // quote char = $6
                        (.*?)       // title = $7
                        \6          // matching quote
                        [ \t]*
                    )?              // title is optional
                    \)
                )
            /g, writeImageTag);
            */
            text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, writeImageTag);

            return text;
        }