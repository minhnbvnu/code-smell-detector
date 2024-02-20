function convertInstallTargetToAbsHostPath(target) {
  if (!target || !_.isString(target)) { throw new Error('invalid target: ' + target); }
  if (target.startsWith(nasTargetProtocal)) { throw new Error('only support \'file://\' protocal for fun.yml target attribute'); }
  
  if (target.startsWith(fileTargetProtocal)) { target = target.substring(fileTargetProtocal.length); }

  const absTarget = path.resolve(target);
  return absTarget;
}