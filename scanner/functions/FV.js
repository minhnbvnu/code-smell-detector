function FV(t,e,n,i,r,o){var a=e.get("color");r?(r.setColor(a),n.add(r),o&&o.onUpdate(r)):((r=Vy(t.get("symbol"),-1,-1,2,2,a)).setStyle("strokeNoScale",!0),n.add(r),o&&o.onCreate(r));var s=e.getItemStyle(["color"]);r.setStyle(s),i=C({rectHover:!0,z2:100},i,!0);var l=By(t.get("symbolSize"));i.scaleX=l[0]/2,i.scaleY=l[1]/2;var u=Fy(t.get("symbolOffset"),l);u&&(i.x=(i.x||0)+u[0],i.y=(i.y||0)+u[1]);var h=t.get("symbolRotate");return i.rotation=(h||0)*Math.PI/180||0,r.attr(i),r.updateTransform(),r}