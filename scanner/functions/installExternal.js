function installExternal(name, destination) {
  return npmCommand("install", destination, [name], { stdio: "ignore" });
}