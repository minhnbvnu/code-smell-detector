function dY(t){const e=$().journey;let r=60;Object.keys(Si).forEach(n=>{const i=Si[n].color,s={cx:20,cy:r,r:7,fill:i,stroke:"#000",pos:Si[n].position};al.drawCircle(t,s);const a={x:40,y:r+7,fill:"#666",text:n,textMargin:e.boxTextMargin|5};al.drawText(t,a),r+=20})}