function getKeystroke(bindings) {
  if (bindings && bindings.length) {
    return `<span class="keystroke">${humanizeKeystrokes(
      bindings[0].keystrokes
    )}</span>`;
  }
}