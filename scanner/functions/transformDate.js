function transformDate(fun, ctx, data) {
  if (!data) return null; // support null
  const _date = moment(data);
  if (!_date.isValid()) {
    fun.errors = [{ keyword: 'x-date', params: [], message: ctx.text('Invalid Date') }];
    return false;
  }
  return _date.toDate();
}