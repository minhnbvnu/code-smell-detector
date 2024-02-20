async function bundleJS(inputDir, outputDir, watch) {
    let buildContext = await esbuild.context({
        entryPoints: {
            carts: `${inputDir}/carts.js`,
            cart: `${inputDir}/cart.js`,
            changes: `${inputDir}/changes.js`,
            settings: `${inputDir}/settings.js`,
            index: `${inputDir}/index.js`,
        },
        bundle: true,
        sourcemap: true,
        outdir: outputDir,
        logLevel: "debug",
        minify: !watch,
    });
    if (!watch) {
        await buildContext.rebuild();
        console.log("Generated JS");
    } else {
        buildContext.watch();
    }
}