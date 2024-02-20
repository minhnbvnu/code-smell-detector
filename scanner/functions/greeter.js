function greeter(name, age) {
  var message = name + ", who is " + age + " years old, says hi!";
  
  return function greet() {
    console.log(message);
  };
}