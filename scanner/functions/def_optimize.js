function def_optimize(node, optimizer) {
            node.DEFMETHOD("optimize", function (compressor) {
                var self = this;
                if (has_flag(self, OPTIMIZED))
                    return self;
                if (compressor.has_directive("use asm"))
                    return self;
                var opt = optimizer(self, compressor);
                set_flag(opt, OPTIMIZED);
                return opt;
            });
        }