function buildDemo(demoName) {
  let nextDemo = demoNameMap[demoName];
  let nextDemoDimensions = nextDemo.dimensions.split('x').map(val => Number(val));
  let isDimensionsMatch = (cbl.dimensions[0] === nextDemoDimensions[0]) && (cbl.dimensions[1] === nextDemoDimensions[1]);

  if (currentDemo.cleanUp) {
    currentDemo.cleanUp();
  }

  if (isDimensionsMatch) {
    nextDemo.init(cbl);
  } else {
    cbl = nextDemo.init();
  }

  currentDemo = nextDemo;
}