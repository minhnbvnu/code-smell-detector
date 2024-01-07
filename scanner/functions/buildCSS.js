function buildCSS() {
  const input =
    `/*! 98.css custom build - ${homepage} */\n` + fs.readFileSync("style.css");

  return postcss()
    .use(require("postcss-inline-svg"))
    // .use(require("postcss-css-variables"))
    // .use(require("postcss-calc"))
    .use(require("postcss-copy")({ dest: "dist", template: "[name].[ext]" }))
    // .use(require("cssnano"))
    .process(input, {
      from: "style.css",
      to: "dist/98.custom-build.css",
      map: { inline: false },
    })
    .then((result) => {
      mkdirp.sync("dist");
      fs.writeFileSync("dist/98.custom-build.css", result.css);
      fs.writeFileSync("dist/98.custom-build.css.map", result.map.toString());
    });
}