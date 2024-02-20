function is_option_chain_op() {
                const must_be_dot = S.text.charCodeAt(S.pos + 1) === 46;
                if (!must_be_dot)
                    return false;
                const cannot_be_digit = S.text.charCodeAt(S.pos + 2);
                return cannot_be_digit < 48 || cannot_be_digit > 57;
            }