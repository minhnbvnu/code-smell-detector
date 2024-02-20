async function queryCourse(data) {
  return request({
    url:'/course',
    method:'post',
    data
  });
}