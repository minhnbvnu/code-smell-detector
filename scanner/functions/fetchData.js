function fetchData (type) {
  const { id, keyword } = this.data

  // 关键字为空时不搜索
  if (type === 'searching' && !keyword.trim()) {
    return Promise.reject(new Error('关键字不能为空'))
  }

  /**
     * 在网络慢的情况下，有可能关键字已经被改变但是上次请求还没有完成，
     * 因此在查询状态下，需要判断本次响应内容是否对应当前查询的关键字，
     * 如果对应再更新数据
     */
  return getCollectionsByBookId(id, {
    start: this.data[type].libraries.length,
    library_name: type === 'searching' ? keyword : null
  }).then(res => {
    if (type === 'searching') {
      const { isFocus, keyword: currentKeyword } = this.data
      if (!isFocus) {
        return Promise.reject(new Error('unfocus 丢弃响应结果'))
      }
      if (currentKeyword !== keyword) {
        return Promise.reject(new Error('timeout 结果返回超时'))
      }
    }
    return res.data.collections
  })
}