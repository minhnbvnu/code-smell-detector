async function bundleCSS(inputFile, outputFile, watch = false) {
    const execAsync = promisify(exec);
    if (!watch) {
        await execAsync(`npx tailwindcss -i ${inputFile} -o ${outputFile} --minify`);
        console.log("Generated CSS");
    } else {
        execAsync(`npx tailwindcss -i ${inputFile} -o ${outputFile} --watch`);
    }
}