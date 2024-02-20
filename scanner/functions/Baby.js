function Baby(firstName, lastName){
      //You can call the Person constructor within the Baby constructor
      Person.call(this,firstName, lastName);
      // We need to add a reference to this Object constructor, otherwise it will use the Person constructor
      this.constructor = Baby;
    }