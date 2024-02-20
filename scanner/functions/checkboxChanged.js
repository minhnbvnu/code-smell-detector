function checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    db.put(todo);
  }