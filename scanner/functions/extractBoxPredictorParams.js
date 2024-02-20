function extractBoxPredictorParams(idx) {
            var box_encoding_predictor = extractConvParams("Prediction/BoxPredictor_" + idx + "/BoxEncodingPredictor", "prediction_layer/box_predictor_" + idx + "/box_encoding_predictor");
            var class_predictor = extractConvParams("Prediction/BoxPredictor_" + idx + "/ClassPredictor", "prediction_layer/box_predictor_" + idx + "/class_predictor");
            return { box_encoding_predictor: box_encoding_predictor, class_predictor: class_predictor };
        }