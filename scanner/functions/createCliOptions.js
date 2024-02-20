function createCliOptions(cliObject) {
    function collect(val, memo) {
        memo.push(val);
        return memo;
    }

    cliObject
        .version(`Solium version ${version}`)
        .description("Linter to find & fix style and security issues in Solidity smart contracts.")
        .usage("[options] <keyword>")

        .option("-i, --init", "Create default rule configuration files")
        .option("-f, --file [filepath::String]", "Solidity file to lint")
        .option("-d, --dir [dirpath::String]", "Directory containing Solidity files to lint")
        .option("-R, --reporter [name::String]", "Format to report lint issues in (pretty | gcc)", "pretty")
        .option("-c, --config [filepath::String]", "Path to the .soliumrc configuration file")
        .option("-, --stdin", "Read input file from stdin")
        .option("--fix", "Fix Lint issues where possible")
        .option("--fix-dry-run", "Output fix diff without applying it")
        .option("--debug", "Display debug information")
        .option("--watch", "Watch for file changes")
        .option("--hot", "(Deprecated) Same as --watch")
        .option("--no-soliumignore", "Do not look for .soliumignore file")
        .option("--no-soliumrc", "Do not look for soliumrc configuration file")
        .option(
            "--rule [rule]",
            "Rule to execute. This overrides the specified rule's configuration in soliumrc if present",
            collect,
            []
        )
        .option(
            "--plugin [plugin]",
            "Plugin to execute. This overrides the specified plugin's configuration in soliumrc if present",
            collect,
            []
        );
}