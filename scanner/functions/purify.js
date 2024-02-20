function purify(spots) {
  const result = {}
  for (const name in spots) {
    result[name] = spots[name].map(spot => ({
      scenario: spot.scenario,
      component: {
        example: spot.component.example,
        template: spot.component.template,
        readme: spot.component.readme
      }
    }))
  }
  return result
}