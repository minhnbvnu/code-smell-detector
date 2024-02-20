function Todos() {
      this.render = __bind(this.render, this);
      Todos.__super__.constructor.apply(this, arguments);
      this.todo.bind('change', this.render);
      this.todo.bind('destroy', this.release);
    }