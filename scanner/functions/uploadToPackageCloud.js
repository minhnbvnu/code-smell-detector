function uploadToPackageCloud(packageDetails) {
    return new Promise(async (resolve, reject) => {
      console.log(
        `Uploading ${
          packageDetails.fileName
        } to https://packagecloud.io/AtomEditor/${packageRepoName}`
      );
      var uploadOptions = {
        url: `https://${apiToken}:@packagecloud.io/api/v1/repos/AtomEditor/${packageRepoName}/packages.json`,
        formData: {
          'package[distro_version_id]': packageDetails.distroId,
          'package[package_file]': fs.createReadStream(packageDetails.filePath)
        }
      };

      request.post(uploadOptions, (error, uploadResponse, body) => {
        if (error || uploadResponse.statusCode !== 201) {
          console.log(
            `Error while uploading '${packageDetails.fileName}' v${
              packageDetails.version
            }: ${uploadResponse}`
          );
          reject(uploadResponse);
        } else {
          console.log(`Successfully uploaded ${packageDetails.fileName}!`);
          resolve(uploadResponse);
        }
      });
    });
  }