async function updateCourse(data) {
  return request({
    url:'/update',
    method:'post',
    data
  });
}