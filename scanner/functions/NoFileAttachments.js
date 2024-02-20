function NoFileAttachments(name) {
  throw new Error(`File not found: ${name}`);
}