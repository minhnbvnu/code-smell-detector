function can_be_extracted_from_if_block(node) {
            return !(node instanceof AST_Const
                || node instanceof AST_Let
                || node instanceof AST_Class);
        }