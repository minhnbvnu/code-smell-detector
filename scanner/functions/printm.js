function printm(m)
{
    if(m.length == 2)
    for(var i=0; i<m.length; i++)
       console.log(m[i][0], m[i][1]);
    else if(m.length == 3)
    for(var i=0; i<m.length; i++)
       console.log(m[i][0], m[i][1], m[i][2]);
    else if(m.length == 4)
    for(var i=0; i<m.length; i++)
       console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
}