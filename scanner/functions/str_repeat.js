function str_repeat(input, multiplier) {
            for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
            return output.join('');
        }