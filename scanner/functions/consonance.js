function consonance(n1, n2)
{
    var no1 = n1.noteNo;
    var no2 = n2.noteNo;

    var diff = Math.max(no1 - no2, no2 - no1);

    // Compute the simple interval between the two notes
    var interv = diff % 12;

    return intervCons[interv];
}