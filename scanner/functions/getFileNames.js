function getFileNames() {
  let fileNamesIndex = new Map();
[
  '0_z0123456789jqx.json', '10_m.json', '11_l.json', '12_i.json', '13_h.json', '14_g.json', '15_f.json', '16_e.json', '17_d.json', '18_c.json', '19_b.json', '1_yk.json', '20_a.json', '2_w.json', '3_vo.json', '4_u.json', '5_t.json', '6_s.json', '7_r.json', '8_p.json', '9_n.json'
].forEach(name => {
    const fileName = name.replace(/^\d\d?_/, '').replace(/\.json$/, '');
    for (var i = 0; i < fileName.length; ++i) {
      let letter = fileName[i];
      fileNamesIndex.set(letter, name);
    }
  });
  return fileNamesIndex;
}