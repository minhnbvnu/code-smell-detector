function releaseMaterialProgramReference(material) {

    var programInfo = properties.get(material).program;

    material.program = undefined;

    if (programInfo !== undefined) {

      programCache.releaseProgram(programInfo);

    }

  }