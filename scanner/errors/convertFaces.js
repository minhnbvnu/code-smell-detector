async function convertFaces (msg, handleAt = false, e) {
  handleAt = e?.isGroup && handleAt
  let groupMembers
  let groupCardQQMap = {}
  if (handleAt) {
    try {
      groupMembers = await e.group.getMemberMap()
    } catch (err) {
      console.error(`Failed to get group members: ${err}`)
    }
    if (groupMembers) {
      for (let key of groupMembers.keys()) {
        groupCardQQMap[groupMembers.get(key).card || groupMembers.get(key).nickname] = groupMembers.get(key).user_id
      }
    }
}
  let tmpMsg = ''
  let tmpFace = ''
  let tmpAt = ''
  let foundFace = false
  let foundAt = false
  let msgs = []
  for (let i = 0; i < msg.length; i++) {
    // console.log(msg[i])
    if (msg[i] === '[') {
      foundFace = true
      continue
    }
    if (!foundFace) {
      if (handleAt && msg[i] === '@') {
        foundAt = true
        if (tmpMsg) {
          msgs.push(tmpMsg)
          tmpMsg = ''
        }
        continue
      }
      if (handleAt && foundAt) {
        tmpAt += msg[i]
        if (groupCardQQMap[tmpAt]) {
          foundAt = false
          msgs.push(segment.at(groupCardQQMap[tmpAt], groupMembers.get(groupCardQQMap[tmpAt]).card, false))
          tmpAt = ''
          continue
        }
      } else {
        tmpMsg += msg[i]
      }
    } else {
      if (msg[i] !== ']') {
        tmpFace += msg[i]
      } else {
        foundFace = false
        if (faceMapReverse[tmpFace] || faceMapReverse['/' + tmpFace] || faceMapReverse[_.trimStart(tmpFace, '/')]) {
          if (tmpMsg) {
            msgs.push(tmpMsg)
          }
          msgs.push(segment.face(parseInt(faceMapReverse[tmpFace] || faceMapReverse['/' + tmpFace] || faceMapReverse[_.trimStart(tmpFace, '/')])))
          tmpMsg = ''
        } else {
          tmpMsg += `[${tmpFace}]`
        }
        tmpFace = ''
      }
    }
  }
  if (tmpMsg) {
    msgs.push(tmpMsg)
  }
  if (tmpFace) {
    msgs.push(`[${tmpFace}`)
  }
  if (handleAt && tmpAt) {
    msgs.push(`@${tmpAt}`)
  }
  return msgs
}