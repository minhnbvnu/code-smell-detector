function make_then(self, output) {
                var b = self.body;
                if (output.option("braces")
                    || output.option("ie8") && b instanceof AST_Do)
                    return make_block(b, output);
                // The squeezer replaces "block"-s that contain only a single
                // statement with the statement itself; technically, the AST
                // is correct, but this can create problems when we output an
                // IF having an ELSE clause where the THEN clause ends in an
                // IF *without* an ELSE block (then the outer ELSE would refer
                // to the inner IF).  This function checks for this case and
                // adds the block braces if needed.
                if (!b)
                    return output.force_semicolon();
                while (true) {
                    if (b instanceof AST_If) {
                        if (!b.alternative) {
                            make_block(self.body, output);
                            return;
                        }
                        b = b.alternative;
                    }
                    else if (b instanceof AST_StatementWithBody) {
                        b = b.body;
                    }
                    else
                        break;
                }
                print_maybe_braced_body(self.body, output);
            }