function localMode(state) {
      return state.state == FRONTMATTER
        ? { mode: yamlMode, state: state.yaml }
        : { mode: innerMode, state: state.inner };
    }