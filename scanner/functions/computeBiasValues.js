function computeBiasValues( propDiff, propBias, propBiasComplement ){
      let biasDiff = 0;
      let biasComplementDiff = 0;
      let biasTotal = propBias + propBiasComplement;

      if( propDiff > 0 && biasTotal > 0 ){
        biasDiff = ( propBias / biasTotal ) * propDiff;
        biasComplementDiff = ( propBiasComplement / biasTotal ) * propDiff;
      }
      return {
        biasDiff: biasDiff,
        biasComplementDiff: biasComplementDiff
      };
    }