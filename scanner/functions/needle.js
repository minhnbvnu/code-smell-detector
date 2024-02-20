function needle(penalty, options) {
	for (i = 1 ; i < max_cols; i++){
        for (j = 1 ; j < max_rows; j++){
            reference[input_index(i,j)] = blosum62[(input_seq_1[i]*24) + input_seq_2[j]];
        }
    }
    for(i = 1; i< max_rows ; i++)
        input_itemsets[input_index(i,0)] = -i * penalty;
    for(j = 1; j< max_cols ; j++)
        input_itemsets[input_index(0,j)] = -j * penalty;

    if (options.use_parallelizable_version) {
        //Compute top-left matrix
        for(i = 0 ; i < max_cols-2 ; i++){
            for( idx = 0 ; idx <= i ; idx++){
                index = (idx + 1) * max_cols + (i + 1 - idx);
                input_itemsets[index]= maximum( input_itemsets[index-1-max_cols]+ reference[index],
                                                input_itemsets[index-1]         - penalty,
                                                input_itemsets[index-max_cols]  - penalty);
            }
        }
        //Compute bottom-right matrix
        for (k = max_rows; k <= 2*(max_rows-1); ++k) {
            for (l = 0; l < 2*(max_rows-1) - k + 1; ++l) {
                index = input_index(max_rows-1-l,k-max_cols+1+l);
                input_itemsets[index]= maximum( input_itemsets[index-1-max_cols]+ reference[index],
                        input_itemsets[index-1]         - penalty,
                        input_itemsets[index-max_cols]  - penalty);
            }
        }
    } else {
        for (i = 1; i < max_rows; ++i) {
            for (j = 1; j < max_cols; ++j) {
                index = input_index(i,j);
                input_itemsets[index] = maximum(
                    input_itemsets[index-1-max_cols] + reference[index],
                    input_itemsets[index-1]-penalty,
                    input_itemsets[index-max_cols]-penalty
                );
            }
        }
    }
}