function nqueenJS(size, unique_solutions)
{
    var solutions = 0;
    var u_solutions = {};
    var i;

    // get initial set of solutions
    for(i = 2; i < size; i++) {
	solutions += nqueen_solver1(size, i);
    }

    unique_solutions["solutions"] = solutions;
    solutions *= 8;

    // accound for symmetries
    for(i = 1; i < size / 2; i++) {
	solutions += nqueen_solver(size, (1 << size) - 1, 1 << i, 1 << (i + 1), (1 << i) >> 1, u_solutions);
	unique_solutions["solutions"] += u_solutions["solutions"];
    }

    timing = size;
    return solutions;
}