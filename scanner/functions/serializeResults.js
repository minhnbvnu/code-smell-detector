function serializeResults(results_) {
        const results = [];
        for (let result of results_) {
            let alternatives = [];
            let item = { is_final: result.isFinal, alternatives: alternatives };
            for (let i = 0; i < result.length; i++) {
                let alternative = {
                    confidence: round(result[i].confidence),
                    transcript: result[i].transcript
                };
                alternatives.push(alternative);
            }
            item.alternatives = alternatives;
            results.push(item);
        }
        return results;
    }