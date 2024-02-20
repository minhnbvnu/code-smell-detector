function Argv(processArgs, cwd) {
        const argv = Yargs(processArgs, cwd, require);
        singletonify(argv);
        // TODO(bcoe): warn if argv.parse() or argv.argv is used directly.
        return argv;
    }