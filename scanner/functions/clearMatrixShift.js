function clearMatrixShift(m) {
  return app.concatenateTranslationMatrix(m, -m.mValueTX, -m.mValueTY);
}