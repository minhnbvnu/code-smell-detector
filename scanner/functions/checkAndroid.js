function checkAndroid(args) {
  return fs.existsSync(path.join(args.root, 'android/gradlew'));
}