function colWrapper(element, str) {
  if (someSpanIsNot24 || element.span !== 24) {
    return `<el-col :span="${element.span}">
      ${str}
    </el-col>`
  }
  return str
}