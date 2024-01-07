function getPts( pts ){
  let retPts = [];

  if( pts == null ){ return; }

  for( let i = 0; i < pts.length; i += 2 ){
    let x = pts[i];
    let y = pts[i+1];

    retPts.push({ x, y });
  }

  return retPts;
}