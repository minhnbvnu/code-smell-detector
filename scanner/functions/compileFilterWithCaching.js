function compileFilterWithCaching() {
            var filterInfo = getFunctionInfo(filter);
            var filterPath1 = "{ continue _coreloop; }$1";
            var filterPath2 = "{ _cache[_i] = true;_retval[_idx++] = $item$; continue _coreloop; }$1";
            // make some allowances for minification - there's only so far we can go with RegEx
            var filterBody = filterInfo.body
                .replace(/return false\s*([;}]|\}|$)/gi, filterPath1)
                .replace(/return!1([;}]|\}|$)/gi, filterPath1)
                .replace(/return true\s*([;}]|\}|$)/gi, filterPath2)
                .replace(/return!0([;}]|\}|$)/gi, filterPath2)
                .replace(/return ([^;}]+?)\s*([;}]|$)/gi, "{ if ((_cache[_i] = $1)) { _retval[_idx++] = $item$; }; continue _coreloop; }$2");
            // This preserves the function template code after JS compression,
            // so that replace() commands still work as expected.
            var tpl = [
                //"function(_items, _args, _cache) { ",
                "var _retval = [], _idx = 0; ",
                "var $item$, $args$ = _args; ",
                "_coreloop: ",
                "for (var _i = 0, _il = _items.length; _i < _il; _i++) { ",
                "$item$ = _items[_i]; ",
                "if (_cache[_i]) { ",
                "_retval[_idx++] = $item$; ",
                "continue _coreloop; ",
                "} ",
                "$filter$; ",
                "} ",
                "return _retval; "
                //"}"
            ].join("");
            tpl = tpl.replace(/\$filter\$/gi, filterBody);
            tpl = tpl.replace(/\$item\$/gi, filterInfo.params[0]);
            tpl = tpl.replace(/\$args\$/gi, filterInfo.params[1]);
            var fn = new Function("_items,_args,_cache", tpl);
            var fnName = "compiledFilterWithCaching";
            fn.displayName = fnName;
            fn.name = setFunctionName(fn, fnName);
            return fn;
        }