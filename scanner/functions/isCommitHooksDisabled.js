function isCommitHooksDisabled() {
      return flags.commitHooks === false || config.getOption('version-commit-hooks') === false;
    }