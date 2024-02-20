function fatal(message) {
                if (message instanceof Error)
                    message = message.stack.replace(/^\S*?Error:/, "ERROR:");
                print_error(message);
                process.exit(1);
            }