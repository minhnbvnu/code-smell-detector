function makeCatalog () {
  const apiGateway = []
  for (let i = 1; i <= 8; i++) {
    const apis = []
    for (let j = 1; j <= 4; j++) {
      for (let k = 1; k <= 4; k++) {
        apis.push({ apiId: `plan${i}_api${j}`, apiStage: `plan${i}_stage${k}` })
      }
    }
    apiGateway.push({ id: `plan${i}`, apis })
  }

  const generic = {}

  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 4; j++) {
      generic[`tracked${i}_${j}`] = { apiId: `tracked_api${i}`, apiStage: `tracked_stage${j}` }
    }
    generic[`untracked${i}`] = { apiId: `untracked_api${i}` }
  }

  return { apiGateway, generic }
}