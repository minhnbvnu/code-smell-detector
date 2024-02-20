function generateRecords(size) {
  return new Array(size).fill(0).map(() => {
    return {
      id: uuid(),
      mall: "WashingtonSquare",
      store: "LatteLarrys",
      sector: "A1",
      category: "food/coffee",
      leaseEnd: "2020-01-20",
      rent: "0.00",
      building: "BuildingZ",
      unit: "G1",
    };
  });
}