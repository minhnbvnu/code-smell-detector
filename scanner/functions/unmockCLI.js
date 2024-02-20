function unmockCLI() {
        cli.stdout = process.stdout;
        cli.stderr = process.stderr;
        // otherwise registered plugins would persist between runs
        plugins.unregisterAll();
      }