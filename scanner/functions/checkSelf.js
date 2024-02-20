function checkSelf(childrenTrue){
        var pc = editablePromiseCollection();
        pc.when(this.$onbeforesave());
        pc.then({
          onWait: angular.bind(this, this.$setWaiting), 
          onTrue: childrenTrue ? angular.bind(this, this.$save) : angular.bind(this, this.$hide), 
          onFalse: angular.bind(this, this.$hide), 
          onString: angular.bind(this, this.$activate)
        });
      }