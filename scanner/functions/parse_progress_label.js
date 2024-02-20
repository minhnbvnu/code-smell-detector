function parse_progress_label(progress) {
  let match = progress.match(/\]\s*(.*)$/);
  return match[1];
}