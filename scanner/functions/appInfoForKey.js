function appInfoForKey(app, key) {
  const plistPath = path.join(app, 'Contents', 'Info.plist')
  const result = childProcess.execSync(
    `/usr/libexec/PlistBuddy -c "Print :'${key}'" "${plistPath}"`,
    {
      encoding: 'utf8',
    }
  )

  return result.trim()
}