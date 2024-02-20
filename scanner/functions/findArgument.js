function findArgument(argumentName) {
            const index = sys.args.indexOf(argumentName);
            return index >= 0 && index < sys.args.length - 1 ? sys.args[index + 1] : void 0;
        }