function addPegs(num, piece, top) {
  const pegs = [
    '000000000',
    '0000x0000',
    '00x000x00',
    '00x0x0x00',
    'x0x000x0x',
    'x0x0x0x0x',
    'x0xx0xx0x'
  ];
  let ptr = 0;
  const conf = pegs[num];
  for (let y=0; y<3; y++) {
    for (let x=0; x<3; x++) {
      if (conf[ptr] === 'x') {
        const mesh = new THREE.Mesh(pegGeo, metalMaterial);
        mesh.position.set(.1*(x-1),.1,.1*(y-1) + (top?.25:-.25));
        mesh.castShadow = mesh.receiveShadow = true;
        piece.add(mesh);
      }
      ptr++;
    }
  }
}