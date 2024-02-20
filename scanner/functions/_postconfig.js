function _postconfig (data) {
  return {
    headers: {
      'Content-type': `application/x-www-form-urlencoded`,
      'Cookie': `${(getuser()).cookieString} ;yq_index=0; yqq_stat=0; ts_last=y.qq.com/portal/profile.html`,
      'Referer': 'http://imgcache.qq.com/music/miniportal_v4/tool/html/fp_gbk.html',
      'Upgrade-insecure-requests': '1',
      'User-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: data,
    method: 'POST'
  }
}