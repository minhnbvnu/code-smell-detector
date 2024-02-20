function isChromeTimeline(rawProfile) {
  if (!Array.isArray(rawProfile)) return false;
  if (rawProfile.length < 1) return false;
  const first = rawProfile[0];
  if (!('pid' in first && 'tid' in first && 'ph' in first && 'cat' in first)) return false;
  if (!rawProfile.find(e => e.name === 'CpuProfile' || e.name === 'Profile' || e.name === 'ProfileChunk')) return false;
  return true;
}