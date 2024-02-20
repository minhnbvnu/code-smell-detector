function updateQrCode(string) {
	qrLib.makeCode(string);

  const data = qrLib._oQRCode.modules;
  const qrData = convertMatrixToBinary(data);
  cbl.setData(qrData, { x: 9 });
}