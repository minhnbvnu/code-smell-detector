function incrementalUpdate({
  originalData,
  xrefInfo,
  newRefs,
  xref = null,
  datasetsRef = null
}) {
  updateXFA(datasetsRef, newRefs, xref);
  const newXref = new _primitives.Dict(null);
  const refForXrefTable = xrefInfo.newRef;
  let buffer, baseOffset;
  const lastByte = originalData[originalData.length - 1];

  if (lastByte === 0x0a || lastByte === 0x0d) {
    buffer = [];
    baseOffset = originalData.length;
  } else {
    buffer = ["\n"];
    baseOffset = originalData.length + 1;
  }

  newXref.set("Size", refForXrefTable.num + 1);
  newXref.set("Prev", xrefInfo.startXRef);
  newXref.set("Type", _primitives.Name.get("XRef"));

  if (xrefInfo.rootRef !== null) {
    newXref.set("Root", xrefInfo.rootRef);
  }

  if (xrefInfo.infoRef !== null) {
    newXref.set("Info", xrefInfo.infoRef);
  }

  if (xrefInfo.encrypt !== null) {
    newXref.set("Encrypt", xrefInfo.encrypt);
  }

  newRefs.push({
    ref: refForXrefTable,
    data: ""
  });
  newRefs = newRefs.sort((a, b) => {
    return a.ref.num - b.ref.num;
  });
  const xrefTableData = [[0, 1, 0xffff]];
  const indexes = [0, 1];
  let maxOffset = 0;

  for (const {
    ref,
    data
  } of newRefs) {
    maxOffset = Math.max(maxOffset, baseOffset);
    xrefTableData.push([1, baseOffset, Math.min(ref.gen, 0xffff)]);
    baseOffset += data.length;
    indexes.push(ref.num);
    indexes.push(1);
    buffer.push(data);
  }

  newXref.set("Index", indexes);

  if (xrefInfo.fileIds.length !== 0) {
    const md5 = computeMD5(baseOffset, xrefInfo);
    newXref.set("ID", [xrefInfo.fileIds[0], md5]);
  }

  const offsetSize = Math.ceil(Math.log2(maxOffset) / 8);
  const sizes = [1, offsetSize, 2];
  const structSize = sizes[0] + sizes[1] + sizes[2];
  const tableLength = structSize * xrefTableData.length;
  newXref.set("W", sizes);
  newXref.set("Length", tableLength);
  buffer.push(`${refForXrefTable.num} ${refForXrefTable.gen} obj\n`);
  writeDict(newXref, buffer, null);
  buffer.push(" stream\n");
  const bufferLen = buffer.reduce((a, str) => a + str.length, 0);
  const footer = `\nendstream\nendobj\nstartxref\n${baseOffset}\n%%EOF\n`;
  const array = new Uint8Array(originalData.length + bufferLen + tableLength + footer.length);
  array.set(originalData);
  let offset = originalData.length;

  for (const str of buffer) {
    writeString(str, offset, array);
    offset += str.length;
  }

  for (const [type, objOffset, gen] of xrefTableData) {
    offset = writeInt(type, sizes[0], offset, array);
    offset = writeInt(objOffset, sizes[1], offset, array);
    offset = writeInt(gen, sizes[2], offset, array);
  }

  writeString(footer, offset, array);
  return array;
}