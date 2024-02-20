function downloadZip() {
    projectGeneratorFunction(
      selectedArray,
      projectName,
      npmVersionPromise
    ).then((res) => {
      const zip = new jszip();
      _.forEach(res, (content, file) => {
        zip.file(file, content);
      });

      zip.generateAsync({ type: 'blob' }).then(function (blob) {
        saveAs(
          blob,
          `${
            projectName || getDefaultProjectName('empty-project', selectedArray)
          }.zip`
        );
      });
    });
  }