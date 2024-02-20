function assertCLMAttrs({ segments, enabled: clmEnabled }) {
  segments.forEach((segment) => {
    const attrs = segment.segment.getAttributes()
    if (clmEnabled) {
      this.equal(attrs['code.function'], segment.name, 'should have appropriate code.function')
      this.ok(
        attrs['code.filepath'].endsWith(segment.filepath),
        'should have appropriate code.filepath'
      )
      this.match(attrs['code.lineno'], /[\d]+/, 'lineno should be a number')
      this.match(attrs['code.column'], /[\d]+/, 'column should be a number')
    } else {
      this.notOk(attrs['code.function'], 'function should not exist')
      this.notOk(attrs['code.filepath'], 'filepath should not exist')
      this.notOk(attrs['code.lineno'], 'lineno should not exist')
      this.notOk(attrs['code.column'], 'column should not exist')
    }
  })
}