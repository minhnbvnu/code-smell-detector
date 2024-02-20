function finalizeUpload(mediaId) {
    //   logger.info(`\n Finalize Upload... \n `);
    //   logger.info(`\n Media Id ${mediaId} \n `);
    return makePost('media/upload', {
      command: 'FINALIZE',
      media_id: mediaId,
    })
      .then(data => mediaId)
      .catch(error => {
        // logger.info(`${error}, Eror in video finalizeUpload`);
      });
  }