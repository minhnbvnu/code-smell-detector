function addTriangle(p1, p2, p3) {
  const m = material.clone();
  const center = new THREE.Vector3().add(p1).add(p2).add(p3).divideScalar(1 / 3);
  const dir = center.normalize();
  const g = new THREE.Group();
  g.add(addLine(p1, p2, m));
  g.add(addLine(p2, p3, m));
  g.add(addLine(p3, p1, m));
  group.add(g);
  groups.push({
    group: g,
    axis: dir
  });
}