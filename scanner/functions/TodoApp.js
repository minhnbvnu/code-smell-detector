function TodoApp() {
      this.renderFooter = __bind(this.renderFooter, this);

      this.toggleElems = __bind(this.toggleElems, this);

      this.addAll = __bind(this.addAll, this);

      this.addNew = __bind(this.addNew, this);
      TodoApp.__super__.constructor.apply(this, arguments);
      Todo.bind('create', this.addNew);
      Todo.bind('refresh', this.addAll);
      Todo.bind('refresh change', this.toggleElems);
      Todo.bind('refresh change', this.renderFooter);
      Todo.fetch();
      this.routes({
        '/:filter': function(param) {
          this.filter = param.filter;
          Todo.trigger('refresh');
          return this.filters.removeClass('selected').filter("[href='#/" + this.filter + "']").addClass('selected');
        }
      });
    }