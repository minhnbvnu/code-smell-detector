function charEq(charOrId1, charOrId2) {
  if(charOrId1 === charOrId2) return true
  if(!charOrId1) return Object.is(charOrId1, charOrId2)
  return charId(charOrId1) === charId(charOrId2)
}