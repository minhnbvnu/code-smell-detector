function lift_key(self, compressor) {
            if (!compressor.option("computed_props"))
                return self;
            // save a comparison in the typical case
            if (!(self.key instanceof AST_Constant))
                return self;
            // allow certain acceptable props as not all AST_Constants are true constants
            if (self.key instanceof AST_String || self.key instanceof AST_Number) {
                if (self.key.value === "__proto__")
                    return self;
                if (self.key.value == "constructor"
                    && compressor.parent() instanceof AST_Class)
                    return self;
                if (self instanceof AST_ObjectKeyVal) {
                    self.quote = self.key.quote;
                    self.key = self.key.value;
                }
                else if (self instanceof AST_ClassProperty) {
                    self.quote = self.key.quote;
                    self.key = make_node(AST_SymbolClassProperty, self.key, {
                        name: self.key.value
                    });
                }
                else {
                    self.quote = self.key.quote;
                    self.key = make_node(AST_SymbolMethod, self.key, {
                        name: self.key.value
                    });
                }
            }
            return self;
        }