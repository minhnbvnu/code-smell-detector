async function addCourse(data) {
  return request({
    url:'/publish',
    method:'post',
    data
  });
}