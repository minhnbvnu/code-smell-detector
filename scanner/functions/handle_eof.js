function handle_eof() {
            // Unwind any open statements
            while (flags.mode === MODE.Statement) {
                restore_mode();
            }
        }