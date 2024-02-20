function updateUsage(kind, tag, delta) {
  const id = `t${kind}/${tag}`;
  return tagsDB()
    .get(id)
    .then(doc =>
      tagsDB().put({ ...doc, usage: parseInt(doc.usage, 10) + delta })
    )
    .catch(err => {
      if (err.status !== 404) throw err;

      return tagsDB().put({ _id: id, usage: 1 });
    });
}