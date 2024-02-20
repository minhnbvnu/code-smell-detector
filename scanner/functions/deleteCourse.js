async function deleteCourse(data) {
  return request({
    url:'/delete',
    method:'post',
    data
  });
}