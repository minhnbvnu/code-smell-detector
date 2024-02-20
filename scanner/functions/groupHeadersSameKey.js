function groupHeadersSameKey (headerArray) {
  let res = [],
    group = headerArray.reduce((header, a) => {
      header[a.key] = [...header[a.key] || [], a];
      return header;
    }, {});
  Object.keys(group).forEach((item) => {
    let values = [];
    group[item].forEach((child) => {
      values.push(child.value);
    });
    res.push({key: item, value: values.join(', ') });
  });
  return res;
}