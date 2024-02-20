async function compile_styles(styles_dir, css_dir) {
        let success = true;
        for (const src of (0, sys_1.scan)(styles_dir, [".less", ".css"])) {
            if ((0, path_1.basename)(src).startsWith("_"))
                continue;
            try {
                const style = (0, sys_1.read)(src);
                const { css } = await less_1.default.render(style, { filename: src });
                const dst = (0, sys_1.rename)(src, { base: styles_dir, dir: css_dir, ext: ".css" });
                (0, sys_1.write)(dst, css);
            }
            catch (error) {
                success = false;
                console.log(`${chalk_1.default.red("\u2717")} failed to compile ${chalk_1.default.magenta(src)}:`);
                console.log(`${error}`);
            }
        }
        return success;
    }