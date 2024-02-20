async function getVitsRoleList (e) {
  const [firstHalf, secondHalf] = [vitsRoleList.slice(0, Math.floor(vitsRoleList.length / 2)).join('、'), vitsRoleList.slice(Math.floor(vitsRoleList.length / 2)).join('、')]
  const [chunk1, chunk2] = [firstHalf.match(/[^、]+(?:、[^、]+){0,30}/g), secondHalf.match(/[^、]+(?:、[^、]+){0,30}/g)]
  const list = [await makeForwardMsg(e, chunk1, 'vits角色列表1'), await makeForwardMsg(e, chunk2, 'vits角色列表2')]
  return await makeForwardMsg(e, list, 'vits角色列表')
}