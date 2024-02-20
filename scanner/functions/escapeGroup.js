function escapeGroup(group) {
  return group.replace(/([=!:$/()])/g, '\\$1');
}