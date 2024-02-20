function inverse3(m)
{
    var a = mat3();
    var d = det3(m);

    var a00 = [
       vec2(m[1][1], m[1][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a01 = [
       vec2(m[1][0], m[1][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a02 = [
       vec2(m[1][0], m[1][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a10 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a11 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a12 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a20 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[1][1], m[1][2])
    ];
    var a21 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[1][0], m[1][2])
    ];
    var a22 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[1][0], m[1][1])
    ];

   a[0][0] = det2(a00)/d;
   a[0][1] = -det2(a10)/d;
   a[0][2] = det2(a20)/d;
   a[1][0] = -det2(a01)/d;
   a[1][1] = det2(a11)/d;
   a[1][2] = -det2(a21)/d;
   a[2][0] = det2(a02)/d;
   a[2][1] = -det2(a12)/d;
   a[2][2] = det2(a22)/d;

   return a;

}