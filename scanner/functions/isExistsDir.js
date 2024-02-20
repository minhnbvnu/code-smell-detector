function isExistsDir(dirname) {
  if (dirname.length === 0) {
    return false;
  }
  try {
    if (fs.statSync(dirname).isDirectory()) {
      return true;
    } else {
      console.warn('Directory does not exist!') ;
      return false;
    }
  } catch (error) {
    console.warn(error.message);
    return false;
  }
}