async function loadDocument(recoveryMode) {
      await pdfManager.ensureDoc("checkHeader");
      await pdfManager.ensureDoc("parseStartXRef");
      await pdfManager.ensureDoc("parse", [recoveryMode]);

      if (!recoveryMode) {
        await pdfManager.ensureDoc("checkFirstPage");
      }

      const [numPages, fingerprint, isPureXfa] = await Promise.all([pdfManager.ensureDoc("numPages"), pdfManager.ensureDoc("fingerprint"), pdfManager.ensureDoc("isPureXfa")]);
      return {
        numPages,
        fingerprint,
        isPureXfa
      };
    }