function opt_arrow(self, compressor) {
        if (!compressor.option("arrows")) return self;
        drop_rest_farg(self, compressor);
        var body = tighten_body(self.value ? [ self.first_statement() ] : self.body, compressor);
        switch (body.length) {
          case 1:
            var stat = body[0];
            if (stat instanceof AST_Return) {
                self.body.length = 0;
                self.value = stat.value;
                break;
            }
          default:
            self.body = body;
            self.value = null;
            break;
        }
        return self;
    }