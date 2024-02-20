function runNeedle(dimensions, penalty, options)
{
    var default_options = {
        nb_possible_items: 10,
        print_results: false,
        print_intermediary_results: false,
        use_parallelizable_version: true
    };

    if (dimensions === undefined) {
        dimensions = 4096;
    }

    if (penalty === undefined) {
        penalty = 1;
    }

    if (options === undefined) {
        options = default_options;
    } else {
        for (var n in default_options) {
            if (default_options.hasOwnProperty(n) && !options.hasOwnProperty(n)) {
                options[n] = default_options[n];
            }
        }
    }


    var penalty,idx, index;
    var size;
    var t1, t2;
    var i,j;

    max_rows = dimensions + 1;
    max_cols = dimensions + 1;

    var aligned_seq_size = 2*dimensions;

    reference = new Int32Array(max_rows*max_cols);
    input_itemsets = new Int32Array(max_rows*max_cols);
    aligned_seq_1 = new Int32Array(aligned_seq_size);
    aligned_seq_2 = new Int32Array(aligned_seq_size);
    input_seq_1 = new Int32Array(max_rows);
    input_seq_2 = new Int32Array(max_cols);

    for (i = 0 ; i < max_cols; i++){
        for (j = 0 ; j < max_rows; j++){
            input_itemsets[i*max_cols+j] = 0;
        }
    }

    for (i = 0; i < aligned_seq_size; ++i) {
        aligned_seq_1[i] = -1;
        aligned_seq_2[i] = -1;
    }

    input_seq_1[0] = -1;
    for(i=1; i< max_rows ; i++){
        input_seq_1[i] = Math.abs(Math.commonRandom()) % options.nb_possible_items;
    }
    input_seq_2[0] = -1;
    for(j=1; j< max_cols ; j++){
        input_seq_2[j] = Math.abs(Math.commonRandom()) % options.nb_possible_items;
    }

    if (options.print_results) { console.log("Computing dynamic programming results"); }

    var t1 = performance.now();
    needle(penalty, options);
    var t2 = performance.now();


    var aligned_index_1 = aligned_seq_size - 1;
    var aligned_index_2 = aligned_seq_size - 1;

    for (i = max_rows - 1, j = max_cols - 1; !(i==0 && j==0);) {
        if (i > 0 && j > 0) {
            var nw = input_itemsets[input_index(i-1,j-1)] + reference[input_index(i,j)];
            var w = input_itemsets[input_index(i,j-1)] - penalty;
            var n = input_itemsets[input_index(i-1,j)] - penalty;
            var n_limit = false;
            var w_limit = false;
            var traceback = maximum(nw,w,n);
        } else if (i === 0) {
            var n_limit = true;
            var w_limit = false;
        } else if (j === 0) {
            var n_limit = false;
            var w_limit = true;
        } else { throw new Error("ERROR invalid trace indexes"); }

        if (n_limit === false && w_limit === false && traceback === nw) {
            aligned_seq_1[aligned_index_1--] = input_seq_1[i--];
            aligned_seq_2[aligned_index_2--] = input_seq_2[j--];
        } else if (n_limit === true || traceback === w) {
            aligned_index_1--;
            aligned_seq_2[aligned_index_2--] = input_seq_2[j--];
        } else if (w_limit === true || traceback === n) {
            aligned_index_2--;
            aligned_seq_1[aligned_index_1--] = input_seq_1[i--];
        } else { throw new Error("ERROR n_limit: " + n_limit + " w_limit: " + w_limit + " traceback: " + traceback); }
    }

    if (dimensions === 4096 && penalty === 1 && options.nb_possible_items === 10) {
        if (!seq_equal(aligned_seq_1, expected_aligned_seq_1)) {
            throw new Error("ERROR: the aligned sequence 1 is different from the values expected.");
        }

        if (!seq_equal(aligned_seq_2, expected_aligned_seq_2)) {
            throw new Error("ERROR: the aligned sequence 2 is different from the values expected.");
        }
    } else {
        console.log(
            "WARNING: No self-checking for dimension '" + dimensions + "', penalty '" + penalty + "', " +
            "and number of possible items '" + options.nb_possible_items + "'"
        );
    }

    console.log("The total time spent is "+ (t2-t1)/1000+ " seconds\n" );
    return { status: 1,
             options: "runNeedle(" + [dimensions, penalty].join(",") + ")",
             time: (t2-t1)/1000 };
}