function applyReuse(translated, options) {
        var comma = ',';
        var options_open = '{';
        var options_close = '}';
    
        var opts = f.extend({}, options);
        delete opts.postProcess;
        delete opts.isFallbackLookup;
    
        while (translated.indexOf(o.reusePrefix) != -1) {
            replacementCounter++;
            if (replacementCounter > o.maxRecursion) { break; } // safety net for too much recursion
            var index_of_opening = translated.lastIndexOf(o.reusePrefix);
            var index_of_end_of_closing = translated.indexOf(o.reuseSuffix, index_of_opening) + o.reuseSuffix.length;
            var token = translated.substring(index_of_opening, index_of_end_of_closing);
            var token_without_symbols = token.replace(o.reusePrefix, '').replace(o.reuseSuffix, '');
    
            if (index_of_end_of_closing <= index_of_opening) {
                f.error('there is an missing closing in following translation value', translated);
                return '';
            }
    
            if (token_without_symbols.indexOf(comma) != -1) {
                var index_of_token_end_of_closing = token_without_symbols.indexOf(comma);
                if (token_without_symbols.indexOf(options_open, index_of_token_end_of_closing) != -1 && token_without_symbols.indexOf(options_close, index_of_token_end_of_closing) != -1) {
                    var index_of_opts_opening = token_without_symbols.indexOf(options_open, index_of_token_end_of_closing);
                    var index_of_opts_end_of_closing = token_without_symbols.indexOf(options_close, index_of_opts_opening) + options_close.length;
                    try {
                        opts = f.extend(opts, JSON.parse(token_without_symbols.substring(index_of_opts_opening, index_of_opts_end_of_closing)));
                        token_without_symbols = token_without_symbols.substring(0, index_of_token_end_of_closing);
                    } catch (e) {
                    }
                }
            }
    
            var translated_token = _translate(token_without_symbols, opts);
            translated = translated.replace(token, f.regexReplacementEscape(translated_token));
        }
        return translated;
    }