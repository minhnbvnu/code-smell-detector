async function run_cli() {
                var content = program.sourceMap && program.sourceMap.content;
                if (content && content !== "inline") {
                    options.sourceMap.content = read_file(content, content);
                }
                if (program.timings)
                    options.timings = true;
                try {
                    if (program.parse) {
                        if (program.parse.acorn) {
                            files = convert_ast(function (toplevel, name) {
                                return require(47) /* acorn */.parse(files[name], {
                                    ecmaVersion: 2018,
                                    locations: true,
                                    program: toplevel,
                                    sourceFile: name,
                                    sourceType: options.module || program.parse.module ? "module" : "script"
                                });
                            });
                        }
                        else if (program.parse.spidermonkey) {
                            files = convert_ast(function (toplevel, name) {
                                var obj = JSON.parse(files[name]);
                                if (!toplevel)
                                    return obj;
                                toplevel.body = toplevel.body.concat(obj.body);
                                return toplevel;
                            });
                        }
                    }
                }
                catch (ex) {
                    fatal(ex);
                }
                let result;
                try {
                    result = await minify(files, options, fs);
                }
                catch (ex) {
                    if (ex.name == "SyntaxError") {
                        print_error("Parse error at " + ex.filename + ":" + ex.line + "," + ex.col);
                        var col = ex.col;
                        var lines = files[ex.filename].split(/\r?\n/);
                        var line = lines[ex.line - 1];
                        if (!line && !col) {
                            line = lines[ex.line - 2];
                            col = line.length;
                        }
                        if (line) {
                            var limit = 70;
                            if (col > limit) {
                                line = line.slice(col - limit);
                                col = limit;
                            }
                            print_error(line.slice(0, 80));
                            print_error(line.slice(0, col).replace(/\S/g, " ") + "^");
                        }
                    }
                    if (ex.defs) {
                        print_error("Supported options:");
                        print_error(format_object(ex.defs));
                    }
                    fatal(ex);
                    return;
                }
                if (program.output == "ast") {
                    if (!options.compress && !options.mangle) {
                        result.ast.figure_out_scope({});
                    }
                    console.log(JSON.stringify(result.ast, function (key, value) {
                        if (value)
                            switch (key) {
                                case "thedef":
                                    return symdef(value);
                                case "enclosed":
                                    return value.length ? value.map(symdef) : undefined;
                                case "variables":
                                case "globals":
                                    return value.size ? collect_from_map(value, symdef) : undefined;
                            }
                        if (skip_keys.has(key))
                            return;
                        if (value instanceof AST_Token)
                            return;
                        if (value instanceof Map)
                            return;
                        if (value instanceof AST_Node) {
                            var result = {
                                _class: "AST_" + value.TYPE
                            };
                            if (value.block_scope) {
                                result.variables = value.block_scope.variables;
                                result.enclosed = value.block_scope.enclosed;
                            }
                            value.CTOR.PROPS.forEach(function (prop) {
                                if (prop !== "block_scope") {
                                    result[prop] = value[prop];
                                }
                            });
                            return result;
                        }
                        return value;
                    }, 2));
                }
                else if (program.output == "spidermonkey") {
                    try {
                        const minified = await minify(result.code, {
                            compress: false,
                            mangle: false,
                            format: {
                                ast: true,
                                code: false
                            }
                        }, fs);
                        console.log(JSON.stringify(minified.ast.to_mozilla_ast(), null, 2));
                    }
                    catch (ex) {
                        fatal(ex);
                        return;
                    }
                }
                else if (program.output) {
                    fs.writeFileSync(program.output, result.code);
                    if (options.sourceMap && options.sourceMap.url !== "inline" && result.map) {
                        fs.writeFileSync(program.output + ".map", result.map);
                    }
                }
                else {
                    console.log(result.code);
                }
                if (program.nameCache) {
                    fs.writeFileSync(program.nameCache, JSON.stringify(options.nameCache));
                }
                if (result.timings)
                    for (var phase in result.timings) {
                        print_error("- " + phase + ": " + result.timings[phase].toFixed(3) + "s");
                    }
            }