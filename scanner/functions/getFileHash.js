async function getFileHash(filePath) {

  if (await isFile(filePath)) {
    return await md5File(filePath);
  } 
  throw new Error('get file hash error, target is not a file, target path is: ' + filePath);
  
}