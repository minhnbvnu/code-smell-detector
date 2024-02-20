function wrap_css_modules(css_dir, js_dir, dts_dir, dts_internal_dir) {
        function* collect_classes(ast) {
            const { stylesheet } = ast;
            if (stylesheet == null)
                return;
            for (const rule of stylesheet.rules) {
                if (rule.type == "rule") {
                    const { selectors } = rule;
                    for (const selector of selectors ?? []) {
                        const classes = selector.match(/\.[A-Za-z0-9_-]+/g);
                        if (classes != null) {
                            for (const cls of classes) {
                                yield cls.substring(1);
                            }
                        }
                    }
                }
            }
        }
        for (const css_path of (0, sys_1.scan)(css_dir, [".css"])) {
            const sub_path = (0, path_1.relative)(css_dir, css_path);
            const css_in = (0, sys_1.read)(css_path);
            const ast = css_1.default.parse(css_in);
            const js = [];
            const dts = [];
            const dts_internal = [];
            dts_internal.push(`declare module "styles/${sub_path.replace(/\\/g, "/")}" {`);
            const classes = new Set(collect_classes(ast));
            for (const cls of classes) {
                if (!cls.startsWith("bk-"))
                    continue;
                const ident = cls.replace(/^bk-/, "").replace(/-/g, "_");
                js.push(`export const ${ident} = "${cls}"`);
                dts.push(`export const ${ident}: string`);
                dts_internal.push(`  export const ${ident}: string`);
            }
            const css_out = css_1.default.stringify(ast, { compress: true });
            js.push(`export default \`${css_out}\``);
            dts.push("export default \"\"");
            dts_internal.push("  export default \"\"");
            dts_internal.push("}");
            const js_file = `${(0, path_1.join)(js_dir, "styles", sub_path)}.js`;
            const dts_file = `${(0, path_1.join)(dts_dir, "styles", sub_path)}.d.ts`;
            const dts_internal_file = `${(0, path_1.join)(dts_internal_dir, "styles", sub_path)}.d.ts`;
            (0, sys_1.write)(js_file, `${js.join("\n")}\n`);
            (0, sys_1.write)(dts_file, `${dts.join("\n")}\n`);
            (0, sys_1.write)(dts_internal_file, `${dts_internal.join("\n")}\n`);
        }
    }