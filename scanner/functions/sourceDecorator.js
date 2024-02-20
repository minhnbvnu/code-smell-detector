function sourceDecorator(options) {
        var shortcutStylePatterns = [], fallthroughStylePatterns = [];
        if (options['tripleQuotedStrings']) {
          // '''multi-line-string''', 'single-line-string', and double-quoted
          shortcutStylePatterns.push(
            [PR_STRING,  /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
              null, '\'"']);
        } else if (options['multiLineStrings']) {
          // 'multi-line-string', "multi-line-string"
          shortcutStylePatterns.push(
            [PR_STRING,  /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
              null, '\'"`']);
        } else {
          // 'single-line-string', "single-line-string"
          shortcutStylePatterns.push(
            [PR_STRING,
              /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,
              null, '"\'']);
        }
        if (options['verbatimStrings']) {
          // verbatim-string-literal production from the C# grammar.  See issue 93.
          fallthroughStylePatterns.push(
            [PR_STRING, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
        }
        var hc = options['hashComments'];
        if (hc) {
          if (options['cStyleComments']) {
            if (hc > 1) {  // multiline hash comments
              shortcutStylePatterns.push(
                [PR_COMMENT, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#']);
            } else {
              // Stop C preprocessor declarations at an unclosed open comment
              shortcutStylePatterns.push(
                [PR_COMMENT, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
                  null, '#']);
            }
            // #include <stdio.h>
            fallthroughStylePatterns.push(
              [PR_STRING,
                /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,
                null]);
          } else {
            shortcutStylePatterns.push([PR_COMMENT, /^#[^\r\n]*/, null, '#']);
          }
        }
        if (options['cStyleComments']) {
          fallthroughStylePatterns.push([PR_COMMENT, /^\/\/[^\r\n]*/, null]);
          fallthroughStylePatterns.push(
            [PR_COMMENT, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
        }
        var regexLiterals = options['regexLiterals'];
        if (regexLiterals) {
          /**
           * @const
           */
          var regexExcls = regexLiterals > 1
            ? ''  // Multiline regex literals
            : '\n\r';
          /**
           * @const
           */
          var regexAny = regexExcls ? '.' : '[\\S\\s]';
          /**
           * @const
           */
          var REGEX_LITERAL = (
            // A regular expression literal starts with a slash that is
            // not followed by * or / so that it is not confused with
            // comments.
          '/(?=[^/*' + regexExcls + '])'
          // and then contains any number of raw characters,
          + '(?:[^/\\x5B\\x5C' + regexExcls + ']'
          // escape sequences (\x5C),
          +    '|\\x5C' + regexAny
          // or non-nesting character sets (\x5B\x5D);
          +    '|\\x5B(?:[^\\x5C\\x5D' + regexExcls + ']'
          +             '|\\x5C' + regexAny + ')*(?:\\x5D|$))+'
          // finally closed by a /.
          + '/');
          fallthroughStylePatterns.push(
            ['lang-regex',
              RegExp('^' + REGEXP_PRECEDER_PATTERN + '(' + REGEX_LITERAL + ')')
            ]);
        }

        var types = options['types'];
        if (types) {
          fallthroughStylePatterns.push([PR_TYPE, types]);
        }

        var keywords = ("" + options['keywords']).replace(/^ | $/g, '');
        if (keywords.length) {
          fallthroughStylePatterns.push(
            [PR_KEYWORD,
              new RegExp('^(?:' + keywords.replace(/[\s,]+/g, '|') + ')\\b'),
              null]);
        }

        shortcutStylePatterns.push([PR_PLAIN,       /^\s+/, null, ' \r\n\t\xA0']);

        var punctuation =
          // The Bash man page says

          // A word is a sequence of characters considered as a single
          // unit by GRUB. Words are separated by metacharacters,
          // which are the following plus space, tab, and newline: { }
          // | & $ ; < >
          // ...

          // A word beginning with # causes that word and all remaining
          // characters on that line to be ignored.

          // which means that only a '#' after /(?:^|[{}|&$;<>\s])/ starts a
          // comment but empirically
          // $ echo {#}
          // {#}
          // $ echo \$#
          // $#
          // $ echo }#
          // }#

          // so /(?:^|[|&;<>\s])/ is more appropriate.

          // http://gcc.gnu.org/onlinedocs/gcc-2.95.3/cpp_1.html#SEC3
          // suggests that this definition is compatible with a
          // default mode that tries to use a single token definition
          // to recognize both bash/python style comments and C
          // preprocessor directives.

          // This definition of punctuation does not include # in the list of
          // follow-on exclusions, so # will not be broken before if preceeded
          // by a punctuation character.  We could try to exclude # after
          // [|&;<>] but that doesn't seem to cause many major problems.
          // If that does turn out to be a problem, we should change the below
          // when hc is truthy to include # in the run of punctuation characters
          // only when not followint [|&;<>].
          '^.[^\\s\\w.$@\'"`/\\\\]*';
        if (options['regexLiterals']) {
          punctuation += '(?!\s*\/)';
        }

        fallthroughStylePatterns.push(
          // TODO(mikesamuel): recognize non-latin letters and numerals in idents
          [PR_LITERAL,     /^@[a-z_$][a-z_$@0-9]*/i, null],
          [PR_TYPE,        /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
          [PR_PLAIN,       /^[a-z_$][a-z_$@0-9]*/i, null],
          [PR_LITERAL,
            new RegExp(
              '^(?:'
              // A hex number
              + '0x[a-f0-9]+'
              // or an octal or decimal number,
              + '|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)'
              // possibly in scientific notation
              + '(?:e[+\\-]?\\d+)?'
              + ')'
              // with an optional modifier like UL for unsigned long
              + '[a-z]*', 'i'),
            null, '0123456789'],
          // Don't treat escaped quotes in bash as starting strings.
          // See issue 144.
          [PR_PLAIN,       /^\\[\s\S]?/, null],
          [PR_PUNCTUATION, new RegExp(punctuation), null]);

        return createSimpleLexer(shortcutStylePatterns, fallthroughStylePatterns);
      }