function addTodo(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };
    db.put(todo, function callback (err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }