function getUserSQL () {
  let sql = `
    REPLACE INTO t_o_user VALUES (1, '9897985048102565651984810257495248', 'test@qq.com', 'test@qq.com', 'e5b698724b9ff4ada5fe3d909ab0013f', '你好', 'admin', 'site', 'http://ww1.sinaimg.cn/large/00749HCsly1fwofq2t1kaj30qn0qnaai.jpg', '', '0', 0, 0);
  `
  return sql
}