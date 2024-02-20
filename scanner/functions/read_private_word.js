function read_private_word() {
                next();
                return token("privatename", read_name());
            }