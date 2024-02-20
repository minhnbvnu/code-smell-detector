function colorSeverity(severity, message) {
      return auditSeverityColors[severity](message || severity);
    }