function tex2svg(formula, options, macros = {}) {
        const tex = new tex_js_1.TeX({ packages: AllPackages_js_1.AllPackages, macros });
        const tex_to_svg = mathjax_js_1.mathjax.document("", { InputJax: tex, OutputJax: svg });
        return tex_to_svg.convert(formula, Object.assign(Object.assign({}, defaults), options));
    }