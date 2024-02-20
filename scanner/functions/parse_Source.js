function parse_Source() {
                var result0;

                result0 = parse_AliasSource();
                if (result0 === null) {
                    result0 = parse_NonAliasSource();
                }
                return result0;
            }