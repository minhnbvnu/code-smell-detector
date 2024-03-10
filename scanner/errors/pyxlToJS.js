function pyxlToJS(src, noYield, internalMode) {
    if (noYield === undefined) { noYield = false; }

    // Replace hard tabs
    src = src.replace(/\t/g, '    ');
    
    // Replace confusingly-similar double bars (we use exclusively Double Vertical Line 0x2016)
    src = src.replace(/∥𝄁║Ⅱǁ/g, '‖');

    // Switch to small element-of everywhere before blocks or strings can be processed
    src = src.replace(/∈/g, '∊');

    const pack = protectQuotedStrings(src);
    src = pack[0];
    const stringProtectionMap = pack[1];

    // Check for newlines in strings
    for (let i = 0; i < stringProtectionMap.length; ++i) {
        const value = stringProtectionMap[i];
        if (value.indexOf('\n') !== -1) {
            src = unprotectQuotedStrings(src, stringProtectionMap);
            const j = src.indexOf(value);
            console.assert(j !== -1);
            const line = src.substring(0, j).split('\n').length - 1;
            throw makeError('Illegal multiline quoted string (use \\n for a newline)', line); 
        }
    }

    // Remove multi-line comments, which cause problems with the indentation and end-of-line metrics
    src = src.replace(/\/\*([\s\S]*?)\*\//g, function(match, contents) {
        // Extract and return just the newlines to keep line numbers unmodified
        return contents.replace(/[^\n]/g, '');
    });

    // Remove single-line comments
    src = src.replace(/\/\/.*$/gm, '');

    // Right-trim all lines, which also collapses empty lines to the
    // empty string.
    src = src.replace(/ +$/gm, '');

    // Replace spread operator
    src = src.replace(/…/g, '...');

    // Pull 'because' on a new line up to the previous line
    src = src.replace(/\)[ ]*((?:\n[\t ]*)+)[ ]*because[ ]+("[^\n"]")/g, ') because $2$1');

    // Switch FOR loops (will be switched back later)
    src = src.replace(/<=/g, '≤');
    src = src.replace(/>=/g, '≥');
    src = src.replace(/\sin\s/g, ' ∊ ');

    // BECAUSE clauses
    {
        const lineArray = compactMultilineLiterals(src.split('\n'))
        const becauseRegExp = RegExp('(' + identifierPattern + '\\([^\\n]*\\))[ ]+because[ ]+("[^"]+")', 'g');
        for (let i = 0; i < lineArray.length; ++i) {
            let line = lineArray[i];

            // Process BECAUSE: `foo(...) because "string"` --> `(because("string"),foo(...))`
            //
            // There must be no space between the comma and the
            // identifier in order for the next regexp to fake a
            // negative lookbehind            
            if (/\)[ ]*because[ ]+"/.test(line)) {
                // We can't process this with a regular expression
                // because we have to parse recursive matching
                // parentheses to find the complete expression before
                // the `because`
                const becausePos = line.indexOf('because ');
                console.assert(becausePos !== -1)

                // Extract the reason
                let reasonBeginPos = becausePos + 'because '.length;
                while (line[reasonBeginPos] !== '"') { ++reasonBeginPos; }
                
                let reasonEndPos = reasonBeginPos + 1;
                while (line[reasonEndPos] !== '"') { ++reasonEndPos; }
                
                // Look backwards for the paren
                let callEndPos = becausePos - 1;
                while (line[callEndPos] !== ')') { --callEndPos; }

                // Look farther backwards for the matching paren
                let callBeginPos = findMatchingParen(line, callEndPos, -1);

                // Move backwards over the identifier
                --callBeginPos;
                while ((callBeginPos >= 0) && /[ΔA-Za-z_0-9αβγΔδζηθιλμρσϕφχψτωΩ]/.test(line[callBeginPos])) { --callBeginPos; }
                ++callBeginPos;

                lineArray[i] = line = line.substring(0, callBeginPos) + '(because(' + line.substring(reasonBeginPos, reasonEndPos + 1) + '),' +
                    line.substring(callBeginPos, callEndPos + 1) + ')' + line.substring(reasonEndPos + 1);
            }

            // Insert BECAUSE for state changes or ASSERTs that do not use them already
            line = lineArray[i] = line.replace(/(^|[^,])((?:set_mode|push_mode|pop_mode|launch_game|reset_game|quit_game)[ ]*\()/g, '$1because("");$2');

            // Look for mismatched if/then/else (conservative test, misses some)
            const ifCount = countRegexOccurences(line, /\bif\b/g);
            const thenCount = countRegexOccurences(line, /\bthen\b/g);
            const elseCount = countRegexOccurences(line, /\belse\b/g);
            if (thenCount > elseCount) {
                throw makeError('"then" without "else".', i);
            } else if (thenCount > ifCount) {
                throw makeError('"then" without "if".', i);
            }
        }
        
        src = lineArray.join('\n');
    }

    // Conditional operator. Replace "if TEST then CONSEQUENT else
    // ALTERNATE" --> "TEST ? CONSEQUENT : ALTERNATE" before "if"
    // statements are parsed.

    // An IF that is not at the start of a line or a block is replaced
    // with an open paren. There are no negative lookbehinds in
    // JavaScript, so we have to structure an explicit test for the
    // regexp.
    {
        // Avoid the protectQuotedStrings value range. Must match the constant below as well
        const STACKED_IF_SYMBOL = '\uF8FF';
        
        let found = true
        // Allow multiple IF...THEN on a single line by processing repeatedly
        while (found) {
            found = false;
            src = src.replace(
                    /^([ ]*\S[^\n]*?(?:[A-Za-z0-9_αβγΔδζηθιλμρσϕφχψτωΩ][ ]|[:\^=\-\+\*/><,\[{\(][ ]*))if\b/gm,
                function (match, prefix) {
                    if (/else[ ]*$/.test(prefix)) {
                        // This was an ELSE IF. Leave it alone
                        return match;
                    }

                    // If the prefix ends with a colon, then we need to distinguish
                    // the function IF from a stacked IF statement:
                    //
                    //   def foo(x): if x: bar()
                    //
                    //   x = {a: if b then 3 else 2}            
                    //
                    // Functional IF has more '{' than '}' in the prefix. When we encounter
                    // a non-functional IF, temporarily replace it so as to not trigger the
                    // same regex again
                    if (/:[ ]$/.test(prefix) && (prefix.split('{').length <= prefix.split('}').length)) {
                        return prefix + STACKED_IF_SYMBOL;
                    } else {
                        found = true;
                        // Functional IF, replace
                        return prefix + '(';
                    }
                });
        } // while

        // Restore the temporarily hidden stacked IFs
        src = src.replace(/\uF8FF/g, 'if');
    } // IF

    // THEN
    src = src.replace(/\bthen\b/g, ') ? (');
    
    // ELSE (which does not begin a block; note that chained
    // conditional operators require parentheses to make this parse
    // unambiguously)
    src = src.replace(/\belse[ ]+(?!:|if)/g, ') : ');
    
    // Handle scopes and block statement translations
    {
        const lineArray = src.split('\n');

        trimEmptyLines(lineArray);
        processElision(lineArray);        
        processBlock(lineArray, 0, noYield, internalMode, stringProtectionMap);
        src = lineArray.join('\n');
    }

    src = src.replace(/\breset\b/g, '{ throw new Error("RESET"); }');

    src = src.replace(/==(?!=)/g, ' === ');
    src = src.replace(/!=(?!=)/g, ' !== ');

    src = src.replace(/≟/g, ' === ');
    src = src.replace(/≠/g, ' !== ');
    src = src.replace(/¬/g, ' ! ');

    // Temporary rename to hide from absolute value
    src = src.replace(/\|\|/g, ' or ');
    src = src.replace(/&&/g, ' and ');

    // Floor and ceiling
    src = src.replace(/[⌉⌋]/g, ')');
    src = src.replace(/[⌈]/g, ' ceil(');
    src = src.replace(/[⌊]/g, ' floor(');

    // Process before blocks and implicit multiplication so that
    // they handle the parentheses correctly
    src = processBars(src, '|', 'abs');
    src = processBars(src, '‖', 'magnitude');

    // Convert hexadecimal and binary so that it is not interpreted as implicit multiplication of 0 * x
    src = src.replace(/([^A-Za-z0-9αβγδζηθιλμρσϕφχτψωΩ_]|^)0x([A-Fa-f0-9]+)/g,
                      function (match, pre, num) {
                          return pre + ' (' + parseInt(num, 16) + ') ';
                      });
    src = src.replace(/([^A-Za-z0-9αβγδζηθιλμρσϕφχτψωΩ_]|^)0b([01]+)/g,
                      function (match, pre, num) {
                          return pre + ' (' + parseInt(num, 2) + ') ';
                      });
     
    // #deg -> #°, so that it will not be detected as implicit multiplication
    // by a variable beginning with "deg"
    src = src.replace(/(\d[\.]?\d*|[½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒])([ ]*deg\b)/g, '$1°');

    // Process implicit multiplication twice, so that it can happen within exponents
    for (let i = 0; i < 2; ++i) {
        // Implicit multiplication. Must be before operations that may
        // put parentheses after numbers, making the product
        // unclear. Regexp is: a (number, parenthetical expression, or
        // bracketed expression), followed by a variable name.

        // Specials (allow parens on the 2nd expression)
        src = src.replace(/([επξ∞½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵝⁱʲˣʸᶻᵏᵘⁿ⁾])[ ]*([\$\(_A-Za-zαβγδζηιθλμρσϕχψωΔΩτεπξ∞])/g, '$1 * $2');

        // Parens (do *not* allow parens on the 2nd expression, as that could be a first class function call)
        src = src.replace(/(\))[ ]*([\$_A-Za-zαβγδζηιθλμρσϕχψωΔΩτεπξ∞])/g, '$1 * $2');

        // Number case (has to rule out a variable name that ends in a
        // number or has a number inside of it)
        src = src.replace(/([^\$A-Za-z0-9αβγδζηθιλμρσϕφχτψωΔΩ_]|^)([0-9\.]*?[0-9])(%|°)?[ ]*([\$\(A-Za-zαβγδζηιθλμρσϕχψωΔΩτεπξ∞_])/g, '$1$2$3 * $4');

        // Fix any instances of text operators that got accentially
        // turned into implicit multiplication. If there are other
        // text operators in the future, they can be added to this
        // pattern.  This also fixes the one case where the pyxl
        // compiler does not inject {} around a loop body: the
        // for-with statement, where it needs to output a single
        // expression to compile those as if they were FOR statements.
        src = src.replace(/\*[ ]*(default|xor|or|and|not|mod|bitxor|bitand|bitor|bitnot|bitnot|bitshr|bitshl|for|with)(\b|\d|$)/g, ' $1$2');

        // Replace exponents
        src = src.replace(/([⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵝⁱʲˣʸᶻᵏᵘⁿ⁽⁾][⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵝⁱʲˣʸᶻᵏᵘⁿ⁽⁾ ]*)/g, '^($1)');
        src = src.replace(/[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵝⁱʲˣᵏʸᶻᵘⁿ⁽⁾]/g, function (match) { return superscriptToNormal[match]; });
        
        // Replace subscripts
        //src = src.replace(/([₊₋₀₁₂₃₄₅₆₇₈₉ₐᵦᵢⱼₓₖᵤₙ₍₎][₊₋₀₁₂₃₄₅₆₇₈₉ₐᵦᵢⱼₓₖᵤₙ₍₎ ]*)/g, '[($1)]');
        //src = src.replace(/[₊₋₀₁₂₃₄₅₆₇₈₉ₐᵦᵢⱼₓₖᵤₙ₍₎]/g, function (match) { return subscriptToNormal[match]; });
    }

    // Numbers ending in percent. This regex is dangerous because it
    // does not distinguish variables ending with a number from standalone
    // number tokens. Process AFTER implicit multiplication so that the inserted
    // parentheses do not disable multiplication
    src = src.replace(/(\d+(?:\.\d*)?|[½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒])%/g, '($1 * 0.01)');

    // Numbers ending in degrees. Does not distinguish variables ending
    // in a number from standalone number tokens. Process AFTER implicit multiplication so that the inserted
    // parentheses do not disable multiplication
    src = src.replace(/(\d+|\d\.\d*|[½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒])°/g, '($1 * .017453292519943295)');

    // Replace fractions after implicit multiplication, so that the parentheses do not 
    // confuse it. Do this AFTER degrees and percentages, so that we can have fractional ones
    src = src.replace(/[½⅓⅔¼¾⅕⅖⅗⅘⅙⅐⅛⅑⅒]/g, function (match) { return fraction[match]; });
    
    // SIN, COS, TAN with a single argument and no parentheses. Must be processed after implicit
    // multiplication so that, e.g., 2 cos θ parses correctly with regard to the \\b
    src = src.replace(RegExp('\\b(cos|sin|tan)[ ]*([επΔξ]|[ ]+' + identifierPattern + ')', 'g'), '$1($2)');
    
    // Process after FOR-loops so that they are easier to parse
    src = src.replace(/≤/g, ' <= ');
    src = src.replace(/≥/g, ' >= ');
    
    // Expand shifts after blocks so that they aren't misparsed inside
    // FOR loops
    src = src.replace(/[◀◁](=?)/g, ' <<$1 ');
    src = src.replace(/[▶▷](=?)/g, ' >>$1 ');

    // Exponentiation
    src = src.replace(/\^/g, '**');

    src = src.replace(/(\b|\d)or(\b|\d)/g, '$1 || $2');
    src = src.replace(/∩(=?)/g, ' &$1 ');
    src = src.replace(/∪(=?)/g, ' |$1 ');

    // Optimize var**(int), which is much less efficient than var*var.
    // Note that we don't allow random (ξ) in here, as it is not constant!
    src = src.replace(RegExp('(.|..)[ ]*(' + identifierPattern + ')\\*\\*\\((-?\\d)\\)', 'g'), function (match, br, identifier, exponent) {

        if (br.match(/\+\+|--|\.|\*\*/)) {
            // Order of operations may be a problem; don't substitute
            return match;
        } else {
            exponent = parseInt(exponent);

            if (exponent === 0) {
                return br + ' identifier**(0)';
            } else if (exponent < 0) {
                return br + ' (1 / (' + identifier + (' * ' + identifier).repeat(-exponent - 1) + '))';
            } else {
                return br + ' (' + identifier + (' * ' + identifier).repeat(exponent - 1) + ')';
            }
        }
    });

    // Look for % and error out, since it is illegal. Do this before
    // we replace mod with %. Note that strings and comments are gone
    // at this point.
    {
        const i = src.indexOf('%');
        if (i !== -1) {
            const line = (src.substring(0, i).match(/\n/g) || []).length;
            throw makeError('Illegal standalone %. Maybe you want the "mod" operator?', line);
        }
    }
    
    
    src = src.replace(/∞|\binfinity\b/g,  ' (Infinity) ');
    src = src.replace(/\bnan\b/g,         ' (NaN) ');
    src = src.replace(/∅|\bnil\b/g,       ' (undefined) ');
    src = src.replace(/π|\bpi\b/g,        ' ($Math.PI) ');
    src = src.replace(/ε|\bepsilon\b/g,   ' (1e-6) ');
    src = src.replace(/ξ/g,               ' random() ');

    // Must come after exponentiation because it uses the same character
    src = src.replace(/⊕(=?)/g, ' ^$1 ');

    src = src.replace(/(\b|\d)and(\b|\d)/g, '$1 && $2');
    src = src.replace(/(\b|\d)mod(\b|\d)/g, '$1 % $2');
    src = src.replace(/(\b|\d)not(\b|\d)/g, '$1 ! $2');
    // Bitwise operations
    const bitopMap = {shl:'<<', shr:'>>', not:'~', and:'&', or:'|', xor:'^'};
    src = src.replace(/(\b|\d)bit(shl|shr|not|and|or|xor)(\b|\d)/g, function (match, a, op, b) {
        return a + bitopMap[op] + b;
    });

    // Debug statements
    src = src.replace(/\bassert\b/g, '$assertEnabled && assert');
    src = src.replace(/\btodo[ ]*\(/g, '$todoEnabled && $todo(');

    // DEFAULT operators. We replace these with (the unused in pyxlscript) '=='
    // operator, which has similar precedence, and then use vectorify
    // to rewrite them as a semantic emulation of nullish operators.
    // When the esprima library supports '??', we'll change the following
    // line to replace with that operator and then change vectorify to
    // have a flag for rewriting nullish, rather than this weird callback.
    //
    // Do this immediately before vectorify, which will restore these.
    src = src.replace(/\bdefault\b/g, '==');

    if (! PARSER_SUPPORTS_OBJECT_SPREAD) { 
        src = protectObjectSpread(src);
    }

    try {
        src = vectorify(src, {
            assignmentReturnsUndefined: true,
            scalarEscapes: true,
            equalsCallback: vectorify.nullishRewriter,
            operatorPrefix: '$',
            throwErrors: true
        });
    } catch (e) {
        // Many compile-time errors are caught here, including missing
        // comma in object literal.
        
        //console.log(unprotectQuotedStrings(src, stringProtectionMap));
        throw e;
    }

    if (! PARSER_SUPPORTS_OBJECT_SPREAD) {
        // Restore the spread operator for objects
        src = unprotectObjectSpread(src);
    }

    // Cleanup formatting
    src = src.replace(/,[ ]+/g, ', ');
    src = src.replace(/[ ]*,/g, ',');
    src = src.replace(/;[ ]*;/g, ';');
    src = src.replace(/(\S)[ ]{2,}/g, '$1 ');
    src = unprotectQuotedStrings(src, stringProtectionMap);

    // Print output code for debugging the compiler
    if (SHOW_COMPILED_CODE && ! internalMode) { console.log(src); }
    return src;
}