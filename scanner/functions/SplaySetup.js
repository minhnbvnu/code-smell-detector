function SplaySetup() {
  splayTree = new SplayTree();
  for (var i = 0; i < kSplayTreeSize; i++) InsertNewNode();
}