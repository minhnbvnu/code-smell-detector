function binary_precedence(op_val) {
        return op_val in binary_ops ? binary_ops[op_val] : 0;
    }