function s3PathForFile(folderPrefix, localPath) {
  return path.join(S3_DIR, folderPrefix, localPath);
}