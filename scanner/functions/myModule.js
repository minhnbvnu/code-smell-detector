function myModule() {
  var name = "tim", age = 28;
  return function greet() {
    return "Hello " + name + ".  Wow, you are " + age + " years old.";
  }
}