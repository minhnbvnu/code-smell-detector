function expandPath(base, candidate) {
  let final;
  if (candidate[0] === '~') {
    const st = candidate[1] === path.sep ? 2 : 1;
    final = path.resolve(process.env.HOME, candidate.slice(st));
  } else if (candidate[0] === path.sep) {
    final = path.resolve(candidate);
    // } else if (candidate[0] === '@') {
    //   return path.join(npmPath,npm name, 'blueprints');
  } else {
    final = path.resolve(base, candidate);
  }
  return final;
}