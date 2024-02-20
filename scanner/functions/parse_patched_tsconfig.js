function parse_patched_tsconfig(base_dir, preconfigure) {
        // XXX: silence the config validator. We are providing inputs through `inputs` argument anyway.
        const json = { ...tsconfig_json, include: undefined, files: ["dummy.ts"] };
        return (0, compiler_1.parse_tsconfig)(json, base_dir, preconfigure);
    }