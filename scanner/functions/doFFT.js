function doFFT()
    {
      fillFFTBuffer();
      signalFFTData.FFT();

      for (var i = 0; i < signalLength; i++)
      {
        signalFFTData.real[i] *= Math.sqrt(signalLength);
        signalFFTData.imag[i] *= Math.sqrt(signalLength);
      }

      var magnitudes = [];

      for (var i = 0; i < signalLength; i++)
      {
        magnitudes.push(
          Math.sqrt(
            (signalFFTData.real[i] * signalFFTData.real[i])
            + (signalFFTData.imag[i] * signalFFTData.imag[i])
            )
          );
      }

      return magnitudes;
    }