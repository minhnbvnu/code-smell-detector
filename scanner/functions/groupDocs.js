function groupDocs(docs, groups) {
  return docs.reduce((acc, doc) => {
    ;(acc[doc.category] = acc[doc.category] || []).push(doc)
    return acc
  }, buildGroupsTemplate(groups))
}