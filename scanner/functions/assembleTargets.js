function assembleTargets(config, targets=[], skipFiles=[]){
  const skipped = [];
  const filtered = [];
  const cd = config.contractsDir;

  for (let target of targets){
    if (skipFiles.includes(target) || path.extname(target) === '.vy'){

      skipped.push({
        canonicalPath: target,
        relativePath: toRelativePath(target, cd),
        source: loadSource(target)
      })

    } else {

      filtered.push({
        canonicalPath: target,
        relativePath: toRelativePath(target, cd),
        source: loadSource(target)
      })
    }
  }

  return {
    skipped: skipped,
    targets: filtered
  }
}