function operateJob (values, resolve, reject) {
  return {
    type: OPERATE_JOB,
    payload: {
      values,
      resolve,
      reject
    }
  }
}