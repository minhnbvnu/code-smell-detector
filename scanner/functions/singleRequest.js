async function singleRequest(article_id) {
  // 这里我们直接使用 axios 库进行请求
  const reply = await axios.post(
    "https://api.juejin.cn/content_api/v1/article/detail",
    {
      article_id,
    }
  );

  return reply.data;
}