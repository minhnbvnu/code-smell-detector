function uploadMedia(twitterClient, mediaPath, mediaType, callback) {
  // const mediaType = 'image/gif'; // `'video/mp4'` is also supported
  const mediaData = require('fs').readFileSync(mediaPath);
  const mediaSize = require('fs').statSync(mediaPath).size;

  initUpload() // Declare that you wish to upload some media
    .then(appendUpload) // Send the data for the media
    .then(finalizeUpload) // Declare that you are done uploading chunks
    .then(mediaId => {
      callback(null, mediaId);
      // You now have an uploaded movie/animated gif
      // that you can reference in Tweets, e.g. `update/statuses`
      // will take a `mediaIds` param.
    })
    .catch(error => {
      callback(error, null);
    });

  /**
   * Step 1 of 3: Initialize a media upload
   * @return Promise resolving to String mediaId
   */
  function initUpload() {
    //  logger.info(`\n Init Upload... \n `);
    return makePost('media/upload', {
      command: 'INIT',
      total_bytes: mediaSize,
      media_type: mediaType,
    }).then(data => data.media_id_string);
  }

  /**
   * Step 2 of 3: Append file chunk
   * @param String mediaId    Reference to media object being uploaded
   * @return Promise resolving to String mediaId (for chaining)
   */
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

  /**
   * Step 3 of 3: Finalize upload
   * @param String mediaId   Reference to media
   * @return Promise resolving to mediaId (for chaining)
   */
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

  /**
   * (Utility function) Send a POST request to the Twitter API
   * @param String endpoint  e.g. 'statuses/upload'
   * @param Object params    Params object to send
   * @return Promise         Rejects if response is error
   */
  function makePost(endpoint, params) {
    return new Promise((resolve, reject) => {
      twitterClient.post(endpoint, params, (error, data, response) => {
        if (error) {
          // logger.info(` Error on Make Post : ${error}`);
          // logger.info(` Response on Make Post : ${JSON.stringify(response)}`);
          reject(error);
        } else {
          // Sending response
          resolve(data);
        }
      });
    });
  }
}