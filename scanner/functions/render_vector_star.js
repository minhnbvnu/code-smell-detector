function render_vector_star(tips,width,height,stroke) {
  //A 5-pointed (5 tips) regular star of radius from center to tip of 1 has a box around it of width = 2 cos(pi/10) and height = 1 + cos(pi/5)
  //  assuming the star is oriented with one point directly above the center.
  //  So the center of the star is at width * 1/2 and height * 0.552786 which is 1 / (1 + cos(pi/5)) (also assuming the y-axis is inverted).
  //  The inner points are at radius 0.381966 = sin(pi/10)/cos(pi/5).
  //  Fortunately with simple transformations with matrices, we can do rotations and scales easily.
  //  See https://en.wikipedia.org/wiki/Rotation_matrix for details.
  //  But because the stroke is done after scaling (it's not scaled), we have to adjust the points after the rotation and scaling happens.
  //A 10-pointed regular star is simpler because it is vertically symmetrical.

  //NOTE: for very thick stroke widths, and small stars, the star might render very strangely!

  var xcenter = width/2;
  var ycenter = 0;
  var inner_radius = 0;
  if (tips == 5) {
    ycenter = height * 0.552786;
    inner_radius = 0.381966; //scale compared to outer_radius of 1.0
  } else {
    //tips == 10
    ycenter = height/2;
    inner_radius = 0.7; //scale compared to outer_radius of 1.0
  }

  // Coordinates of the first tip, and the first inner corner
  var xtip = 1; // radius 1
  var ytip = 0;
  var xinner = inner_radius * Math.cos(Math.PI/(tips==5?5:10));
  var yinner = inner_radius * Math.sin(Math.PI/(tips==5?5:10));

  var points = [];

//  var tmp_outside_points = []; // uncomment to see the calculated edge of the star (outside the stroke width)

  var angle = 2*Math.PI / tips;
  // generate points without offset from stroke width first
  for (var i=0; i < tips; i++) {
    var a = i * angle - Math.PI/2;

    // Tip first...
    // Rotate the outer tip around the origin:
    var x = xtip * Math.cos(a);  // because ytip = 0 we don't include:  - ytip * Math.sin(a);
    var y = xtip * Math.sin(a);  // because ytip = 0 we don't include:  + ytip * Math.cos(a);
    // Scale for the bounding box:
    x = x * width / (2 * Math.cos(Math.PI/10));
    y = y * height / (tips==5?(1 + Math.cos(Math.PI/5)):2);
    points.push([x,y]);
//    tmp_outside_points.push(x+" "+y); // uncomment to see the calculated edge of the star (outside the stroke width)

    // Now the inner corner...
    // Rotate the inner corner around the origin:
    x = xinner * Math.cos(a) - yinner * Math.sin(a);
    y = xinner * Math.sin(a) + yinner * Math.cos(a);
    // Scale for the bounding box:
    x = x * width / (2 * Math.cos(Math.PI/10));
    y = y * height / (tips==5?(1 + Math.cos(Math.PI/5)):2);
    points.push([x,y]);
//    tmp_outside_points.push(x+" "+y); // uncomment to see the calculated edge of the star (outside the stroke width)
  }

  var inset_points = [];
  for (var i=0; i < points.length; i++) {
    var pA = points[(((i-1)%points.length)+points.length)%points.length]; // Javascript modulus "bug"
    var p0 = points[i];
    var pB = points[(i+1)%points.length];

    var dAx = p0[0] - pA[0];
    var dAy = p0[1] - pA[1];
    var dBx = p0[0] - pB[0];
    var dBy = p0[1] - pB[1];

    var dBLength = Math.sqrt(dBx**2 + dBy**2);

    // The trig here is a bit hairy.  Basically, finding the inset points is done by finding the angle (theta)
    // between the tips and the neighboring inner corners (or vice versa).  Then, that angle is used to
    // calculate vector scaling factors for half the thickness of the stroked path.  Which then is used to find
    // the actual inset points for the tips and inner corners.
    var theta = Math.atan2(dAx*dBy-dAy*dBx, dAx*dBx + dAy*dBy); // angle between the vectors
    var theta = (i%2? Math.PI * 2 - theta : theta);
    var stroke_prime = dBLength * Math.tan(theta/2); // this is really a scaling factor
    var xprime = p0[0] + (i%2?-1:1)*((stroke/2)/stroke_prime)*dBx + dBy*(stroke/2)/dBLength;
    var yprime = p0[1] + (i%2?-1:1)*((stroke/2)/stroke_prime)*dBy + -1 *  dBx*(stroke/2)/dBLength;;

    inset_points.push(xprime+","+yprime);
  }

// NOTE: use svg transformations to center the thing
  return "<polygon stroke-miterlimit='64' points='"+inset_points.join(" ")+"' transform='translate(" + xcenter + " " + ycenter + ")'/>";

// Append these if you want to see what is being calculated.
// The cyan dashed line is the outside of the star including the stroke width.
// The red dashed line is just the star polygon points themselves.
//    "<polygon stroke-width='4' stroke='red' stroke-dasharray='16 12' fill-opacity='0' points='"+inset_points.join(" ")+"' transform='translate(" + xcenter + " " + ycenter + ")'/>" +
//    "<polygon stroke-width='4' stroke='cyan' stroke-dasharray='16 12' fill-opacity='0' points='"+tmp_outside_points.join(" ")+"' transform='translate(" + xcenter + " " + ycenter + ")'/>";
}