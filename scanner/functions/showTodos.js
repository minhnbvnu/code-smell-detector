function showTodos() {
    db.allDocs({
      include_docs: true,
      descending: true
    }, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
  }