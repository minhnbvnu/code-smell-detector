function getOldProgram({ options, builderPrograms, compilerHost }, proj, parsed) {
            if (options.force)
                return void 0;
            const value = builderPrograms.get(proj);
            if (value)
                return value;
            return readBuilderProgram(parsed.options, compilerHost);
        }