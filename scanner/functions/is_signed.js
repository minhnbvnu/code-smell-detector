function is_signed(file_data) {
  return !!PATTERN.exec(file_data);
}