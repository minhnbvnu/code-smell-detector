function log_input(files, options, fs, debug_folder) {
            if (!(fs && fs.writeFileSync && fs.mkdirSync)) {
                return;
            }
            try {
                fs.mkdirSync(debug_folder);
            }
            catch (e) {
                if (e.code !== "EEXIST")
                    throw e;
            }
            const log_path = `${debug_folder}/terser-debug-${(Math.random() * 9999999) | 0}.log`;
            options = options || {};
            const options_str = JSON.stringify(options, (_key, thing) => {
                if (typeof thing === "function")
                    return "[Function " + thing.toString() + "]";
                if (thing instanceof RegExp)
                    return "[RegExp " + thing.toString() + "]";
                return thing;
            }, 4);
            const files_str = (file) => {
                if (typeof file === "object" && options.parse && options.parse.spidermonkey) {
                    return JSON.stringify(file, null, 2);
                }
                else if (typeof file === "object") {
                    return Object.keys(file)
                        .map((key) => key + ": " + files_str(file[key]))
                        .join("\n\n");
                }
                else if (typeof file === "string") {
                    return "```\n" + file + "\n```";
                }
                else {
                    return file; // What do?
                }
            };
            fs.writeFileSync(log_path, "Options: \n" + options_str + "\n\nInput files:\n\n" + files_str(files) + "\n");
        }