function makeAdvisoryTableRow(patchedIn) {
      const patchRows = [];

      if (patchedIn) {
        patchRows.push({ 'Patched in': patchedIn });
      }

      return [{ [chalk.bold(colorSeverity(auditAdvisory.severity))]: chalk.bold(auditAdvisory.title) }, { Package: auditAdvisory.module_name }, ...patchRows, { 'Dependency of': `${resolution.path.split('>')[0]} ${resolution.dev ? '[dev]' : ''}` }, { Path: resolution.path.split('>').join(' > ') }, { 'More info': `https://www.npmjs.com/advisories/${auditAdvisory.id}` }];
    }