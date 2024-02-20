function mathml2svg(formula) {
        const mathml = new mathml_1.MathML({});
        const mathml_to_svg = mathjax_js_1.mathjax.document("", { InputJax: mathml, OutputJax: svg });
        return mathml_to_svg.convert(formula, defaults);
    }