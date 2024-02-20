function uploadMediaPromise(twitterClient, mediaPath, mediaType) {
  const mediaData = require('fs').readFileSync(mediaPath);
  const mediaSize = require('fs').statSync(mediaPath).size;

  // // let mediaData = readFileSync(mediaPath);
  // let mediaData = readFileSync(new URL(mediaPath))
  // // mediaData = path.normalize(mediaData)

  // const mediaSize = fs.statSync(mediaPath).size;

  return new Promise((resolve, reject) => {
    initUpload() // Declare that you wish to upload some media
      .then(appendUpload) // Send the data for the media
      .then(finalizeUpload) // Declare that you are done uploading chunks
      .then(mediaId => {
        // Sending response
        resolve(mediaId);
      })
      .catch(error => {
        reject(mediaPath);
      });
  });

  function initUpload() {
    //  logger.info(`\n Init Upload... \n `);
    return makePost('media/upload', {
      command: 'INIT',
      total_bytes: mediaSize,
      media_type: mediaType,
    })
      .then(data => data.media_id_string)
      .catch(() => {
        //   logger.info("init error");
      });
  }

  function appendUpload(mediaId) {
    // logger.info(`\n Append Upload... \n `);
    // logger.info(`\n Media Id ${mediaId} \n `);
    return makePost('media/upload', {
      command: 'APPEND',
      media_id: mediaId,
      media: mediaData,
      segment_index: 0,
    })
      .then(data => mediaId)
      .catch(() => {
        //  logger.info("append error");
      });
  }

  function finalizeUpload(mediaId) {
    //  logger.info(`\n Finalize Upload... \n `);
    //  logger.info(`\n Media Id ${mediaId} \n `);
    return makePost('media/upload', {
      command: 'FINALIZE',
      media_id: mediaId,
    })
      .then(data => mediaId)
      .catch(() => {
        //   logger.info('finalize error');
      });
  }

  function makePost(endpoint, params) {
    return new Promise((resolve, reject) => {
      twitterClient.post(endpoint, params, (error, data, response) => {
        if (error) {
          //   logger.info(` Error on Make Post : ${error}`);
          //   logger.info(` Response on Make Post : ${JSON.stringify(response)}`);
          reject(error);
        } else {
          //  logger.info(`\n`, "done uploading!", `\n`);
          // Sending response
          resolve(data);
          //  logger.info(data);
        }
      });
    });
  }
}