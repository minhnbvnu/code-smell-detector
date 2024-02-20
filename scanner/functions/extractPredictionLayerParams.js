function extractPredictionLayerParams() {
            return {
                conv_0: extractPointwiseConvParams('Prediction', 0, 'prediction_layer/conv_0'),
                conv_1: extractPointwiseConvParams('Prediction', 1, 'prediction_layer/conv_1'),
                conv_2: extractPointwiseConvParams('Prediction', 2, 'prediction_layer/conv_2'),
                conv_3: extractPointwiseConvParams('Prediction', 3, 'prediction_layer/conv_3'),
                conv_4: extractPointwiseConvParams('Prediction', 4, 'prediction_layer/conv_4'),
                conv_5: extractPointwiseConvParams('Prediction', 5, 'prediction_layer/conv_5'),
                conv_6: extractPointwiseConvParams('Prediction', 6, 'prediction_layer/conv_6'),
                conv_7: extractPointwiseConvParams('Prediction', 7, 'prediction_layer/conv_7'),
                box_predictor_0: extractBoxPredictorParams(0),
                box_predictor_1: extractBoxPredictorParams(1),
                box_predictor_2: extractBoxPredictorParams(2),
                box_predictor_3: extractBoxPredictorParams(3),
                box_predictor_4: extractBoxPredictorParams(4),
                box_predictor_5: extractBoxPredictorParams(5)
            };
        }