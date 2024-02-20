function createCategories(widgets){
      var categories = {};
      angular.forEach(widgets, function(widget, key){
        var category = widget.category;
        // if the widget has no category use a default one
        if (!category){
          category = 'Miscellaneous';
        }
        // push widget to category array
        if (angular.isUndefined(categories[category])){
          categories[category] = {widgets: {}};
        }
        categories[category].widgets[key] = widget;
      });
      return categories;
    }