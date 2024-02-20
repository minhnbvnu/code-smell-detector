function retain_top_func(fn, compressor) {
            return compressor.top_retain
                && fn instanceof AST_Defun
                && has_flag(fn, TOP)
                && fn.name
                && compressor.top_retain(fn.name);
        }