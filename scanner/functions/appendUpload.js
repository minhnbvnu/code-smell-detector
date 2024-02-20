function appendUpload(mediaId) {
    //  logger.info(`\n Append Upload... \n `);
    //  logger.info(`\n Media Id ${mediaId} \n `);
    return makePost('media/upload', {
      command: 'APPEND',
      media_id: mediaId,
      media: mediaData,
      segment_index: 0,
    })
      .then(data => mediaId)
      .catch(error => {
        // logger.info(`${error}, Eror in video appendUpload`);
      });
  }