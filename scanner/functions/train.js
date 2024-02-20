function train(node) {
  // The wrong guess
  var guess = node.data;
  // What is it?
  var answer = readlineSync.question("Ok, what are you? ");
  // Get a new question?
  var question = readlineSync.question("Suggest a yes/no question to distinguish a " + guess + " from a " + answer + ".\n");
  node.data = question;
  // Yes or no for that question
  if (ask("Answer for a " + answer + ": " + question)) {
    node.yes = new Node(answer);
    node.no = new Node(guess);
    console.log ("Great! Now I know about " + answer + "s !");
    console.log("Play again?");
  } else {
    node.yes = new Node(guess);
    node.no = new Node(answer);
    //adding it here did not gen a thanks
    //console.log(thank);
  }
  // Save back to the file
  var tree = JSON.stringify(root, null, 2);
  fs.writeFileSync('tree.json', tree);
}