function import_meta() {
                var start = S.token;
                expect_token("name", "import");
                expect_token("punc", ".");
                expect_token("name", "meta");
                return subscripts(new AST_ImportMeta({
                    start: start,
                    end: prev()
                }), false);
            }