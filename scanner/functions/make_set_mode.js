function make_set_mode(info) {
            return function () {
                editor.set_codemirror_mode(info);
                // save codemirror mode for extension when explicitly selected
                editor.save_codemirror_mode(info);
            };
        }