function defaultSeverityBadge(severity) {
  const colors = {
    warn: 'yellow',
    error: 'red',
  }
  return `![Default Severity Badge ${severity}](https://img.shields.io/badge/Default%20Severity-${severity}-${colors[severity]})`
}