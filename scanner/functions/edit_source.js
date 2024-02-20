function edit_source(source, sveltePath) {
    return source === "svelte" || source.startsWith("svelte/") ? source.replace("svelte", sveltePath) : source;
  }