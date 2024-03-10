function _bitmap_decompress2($output,$width,$height,$input,$size){
 var label=0;
 var sp=STACKTOP; (assert((STACKTOP|0) < (STACK_MAX|0))|0);
 label = 1; 
 while(1)switch(label){
 case 1: 
 var $1;
 var $2;
 var $3;
 var $4;
 var $5;
 var $6;
 var $end;
 var $prevline;
 var $line;
 var $opcode;
 var $count;
 var $offset;
 var $isfillormix;
 var $x;
 var $lastopcode;
 var $insertmix;
 var $bicolour;
 var $code;
 var $colour1;
 var $colour2;
 var $mixmask;
 var $mask;
 var $mix;
 var $fom_mask;
 $2=$output;
 $3=$width;
 $4=$height;
 $5=$input;
 $6=$size;
 var $7=$5;
 var $8=$6;
 var $9=(($7+$8)|0);
 $end=$9;
 $prevline=0;
 $line=0;
 var $10=$3;
 $x=$10;
 $lastopcode=-1;
 $insertmix=0;
 $bicolour=0;
 $colour1=0;
 $colour2=0;
 $mask=0;
 $mix=-1;
 $fom_mask=0;
 label=2;break;
 case 2: 
 var $12=$5;
 var $13=$end;
 var $14=($12>>>0)<($13>>>0);
 if($14){label=3;break;}else{label=346;break;}
 case 3: 
 $fom_mask=0;
 var $16=$5;
 var $17=(($16+1)|0);
 $5=$17;
 var $18=HEAP8[($16)];
 $code=$18;
 var $19=$code;
 var $20=($19&255);
 var $21=$20>>4;
 $opcode=$21;
 var $22=$opcode;
 if(($22|0)==12|($22|0)==13|($22|0)==14){ label=4;break;}else if(($22|0)==15){ label=5;break;}else{label=9;break;}
 case 4: 
 var $24=$opcode;
 var $25=((($24)-(6))|0);
 $opcode=$25;
 var $26=$code;
 var $27=($26&255);
 var $28=$27&15;
 $count=$28;
 $offset=16;
 label=10;break;
 case 5: 
 var $30=$code;
 var $31=($30&255);
 var $32=$31&15;
 $opcode=$32;
 var $33=$opcode;
 var $34=($33|0)<9;
 if($34){label=6;break;}else{label=7;break;}
 case 6: 
 var $36=$5;
 var $37=(($36+1)|0);
 $5=$37;
 var $38=HEAP8[($36)];
 var $39=($38&255);
 $count=$39;
 var $40=$5;
 var $41=(($40+1)|0);
 $5=$41;
 var $42=HEAP8[($40)];
 var $43=($42&255);
 var $44=$43<<8;
 var $45=$count;
 var $46=$45|$44;
 $count=$46;
 label=8;break;
 case 7: 
 var $48=$opcode;
 var $49=($48|0)<11;
 var $50=($49?8:1);
 $count=$50;
 label=8;break;
 case 8: 
 $offset=0;
 label=10;break;
 case 9: 
 var $53=$opcode;
 var $54=$53>>1;
 $opcode=$54;
 var $55=$code;
 var $56=($55&255);
 var $57=$56&31;
 $count=$57;
 $offset=32;
 label=10;break;
 case 10: 
 var $59=$offset;
 var $60=($59|0)!=0;
 if($60){label=11;break;}else{label=22;break;}
 case 11: 
 var $62=$opcode;
 var $63=($62|0)==2;
 if($63){var $68=1;label=13;break;}else{label=12;break;}
 case 12: 
 var $65=$opcode;
 var $66=($65|0)==7;
 var $68=$66;label=13;break;
 case 13: 
 var $68;
 var $69=($68&1);
 $isfillormix=$69;
 var $70=$count;
 var $71=($70|0)==0;
 if($71){label=14;break;}else{label=18;break;}
 case 14: 
 var $73=$isfillormix;
 var $74=($73|0)!=0;
 if($74){label=15;break;}else{label=16;break;}
 case 15: 
 var $76=$5;
 var $77=(($76+1)|0);
 $5=$77;
 var $78=HEAP8[($76)];
 var $79=($78&255);
 var $80=((($79)+(1))|0);
 $count=$80;
 label=17;break;
 case 16: 
 var $82=$5;
 var $83=(($82+1)|0);
 $5=$83;
 var $84=HEAP8[($82)];
 var $85=($84&255);
 var $86=$offset;
 var $87=((($85)+($86))|0);
 $count=$87;
 label=17;break;
 case 17: 
 label=21;break;
 case 18: 
 var $90=$isfillormix;
 var $91=($90|0)!=0;
 if($91){label=19;break;}else{label=20;break;}
 case 19: 
 var $93=$count;
 var $94=$93<<3;
 $count=$94;
 label=20;break;
 case 20: 
 label=21;break;
 case 21: 
 label=22;break;
 case 22: 
 var $98=$opcode;
 switch(($98|0)){case 0:{ label=23;break;}case 8:{ label=28;break;}case 3:{ label=29;break;}case 6:case 7:{ label=30;break;}case 9:{ label=31;break;}case 10:{ label=32;break;}default:{label=33;break;}}break;
 case 23: 
 var $100=$lastopcode;
 var $101=$opcode;
 var $102=($100|0)==($101|0);
 if($102){label=24;break;}else{label=27;break;}
 case 24: 
 var $104=$x;
 var $105=$3;
 var $106=($104|0)==($105|0);
 if($106){label=25;break;}else{label=26;break;}
 case 25: 
 var $108=$prevline;
 var $109=($108|0)==0;
 if($109){label=27;break;}else{label=26;break;}
 case 26: 
 $insertmix=1;
 label=27;break;
 case 27: 
 label=33;break;
 case 28: 
 var $113=$5;
 var $114=(($113+1)|0);
 $5=$114;
 var $115=HEAP8[($113)];
 var $116=($115&255);
 $colour1=$116;
 var $117=$5;
 var $118=(($117+1)|0);
 $5=$118;
 var $119=HEAP8[($117)];
 var $120=($119&255);
 var $121=$120<<8;
 var $122=$colour1;
 var $123=($122&65535);
 var $124=$123|$121;
 var $125=(($124)&65535);
 $colour1=$125;
 label=29;break;
 case 29: 
 var $127=$5;
 var $128=(($127+1)|0);
 $5=$128;
 var $129=HEAP8[($127)];
 var $130=($129&255);
 $colour2=$130;
 var $131=$5;
 var $132=(($131+1)|0);
 $5=$132;
 var $133=HEAP8[($131)];
 var $134=($133&255);
 var $135=$134<<8;
 var $136=$colour2;
 var $137=($136&65535);
 var $138=$137|$135;
 var $139=(($138)&65535);
 $colour2=$139;
 label=33;break;
 case 30: 
 var $141=$5;
 var $142=(($141+1)|0);
 $5=$142;
 var $143=HEAP8[($141)];
 var $144=($143&255);
 $mix=$144;
 var $145=$5;
 var $146=(($145+1)|0);
 $5=$146;
 var $147=HEAP8[($145)];
 var $148=($147&255);
 var $149=$148<<8;
 var $150=$mix;
 var $151=($150&65535);
 var $152=$151|$149;
 var $153=(($152)&65535);
 $mix=$153;
 var $154=$opcode;
 var $155=((($154)-(5))|0);
 $opcode=$155;
 label=33;break;
 case 31: 
 $mask=3;
 $opcode=2;
 $fom_mask=3;
 label=33;break;
 case 32: 
 $mask=5;
 $opcode=2;
 $fom_mask=5;
 label=33;break;
 case 33: 
 var $159=$opcode;
 $lastopcode=$159;
 $mixmask=0;
 label=34;break;
 case 34: 
 var $161=$count;
 var $162=($161|0)>0;
 if($162){label=35;break;}else{label=345;break;}
 case 35: 
 var $164=$x;
 var $165=$3;
 var $166=($164|0)>=($165|0);
 if($166){label=36;break;}else{label=39;break;}
 case 36: 
 var $168=$4;
 var $169=($168|0)<=0;
 if($169){label=37;break;}else{label=38;break;}
 case 37: 
 $1=0;
 label=347;break;
 case 38: 
 $x=0;
 var $172=$4;
 var $173=((($172)-(1))|0);
 $4=$173;
 var $174=$line;
 $prevline=$174;
 var $175=$2;
 var $176=$175;
 var $177=$4;
 var $178=$3;
 var $179=(Math_imul($177,$178)|0);
 var $180=(($176+($179<<1))|0);
 $line=$180;
 label=39;break;
 case 39: 
 var $182=$opcode;
 switch(($182|0)){case 3:{ label=261;break;}case 4:{ label=272;break;}case 8:{ label=283;break;}case 13:{ label=321;break;}case 14:{ label=332;break;}case 0:{ label=40;break;}case 1:{ label=69;break;}case 2:{ label=93;break;}default:{label=343;break;}}break;
 case 40: 
 var $184=$insertmix;
 var $185=($184|0)!=0;
 if($185){label=41;break;}else{label=45;break;}
 case 41: 
 var $187=$prevline;
 var $188=($187|0)==0;
 if($188){label=42;break;}else{label=43;break;}
 case 42: 
 var $190=$mix;
 var $191=$x;
 var $192=$line;
 var $193=(($192+($191<<1))|0);
 HEAP16[(($193)>>1)]=$190;
 label=44;break;
 case 43: 
 var $195=$x;
 var $196=$prevline;
 var $197=(($196+($195<<1))|0);
 var $198=HEAP16[(($197)>>1)];
 var $199=($198&65535);
 var $200=$mix;
 var $201=($200&65535);
 var $202=$199^$201;
 var $203=(($202)&65535);
 var $204=$x;
 var $205=$line;
 var $206=(($205+($204<<1))|0);
 HEAP16[(($206)>>1)]=$203;
 label=44;break;
 case 44: 
 $insertmix=0;
 var $208=$count;
 var $209=((($208)-(1))|0);
 $count=$209;
 var $210=$x;
 var $211=((($210)+(1))|0);
 $x=$211;
 label=45;break;
 case 45: 
 var $213=$prevline;
 var $214=($213|0)==0;
 if($214){label=46;break;}else{label=57;break;}
 case 46: 
 label=47;break;
 case 47: 
 var $217=$count;
 var $218=$217&-8;
 var $219=($218|0)!=0;
 if($219){label=48;break;}else{var $226=0;label=49;break;}
 case 48: 
 var $221=$x;
 var $222=((($221)+(8))|0);
 var $223=$3;
 var $224=($222|0)<($223|0);
 var $226=$224;label=49;break;
 case 49: 
 var $226;
 if($226){label=50;break;}else{label=51;break;}
 case 50: 
 var $228=$x;
 var $229=$line;
 var $230=(($229+($228<<1))|0);
 HEAP16[(($230)>>1)]=0;
 var $231=$count;
 var $232=((($231)-(1))|0);
 $count=$232;
 var $233=$x;
 var $234=((($233)+(1))|0);
 $x=$234;
 var $235=$x;
 var $236=$line;
 var $237=(($236+($235<<1))|0);
 HEAP16[(($237)>>1)]=0;
 var $238=$count;
 var $239=((($238)-(1))|0);
 $count=$239;
 var $240=$x;
 var $241=((($240)+(1))|0);
 $x=$241;
 var $242=$x;
 var $243=$line;
 var $244=(($243+($242<<1))|0);
 HEAP16[(($244)>>1)]=0;
 var $245=$count;
 var $246=((($245)-(1))|0);
 $count=$246;
 var $247=$x;
 var $248=((($247)+(1))|0);
 $x=$248;
 var $249=$x;
 var $250=$line;
 var $251=(($250+($249<<1))|0);
 HEAP16[(($251)>>1)]=0;
 var $252=$count;
 var $253=((($252)-(1))|0);
 $count=$253;
 var $254=$x;
 var $255=((($254)+(1))|0);
 $x=$255;
 var $256=$x;
 var $257=$line;
 var $258=(($257+($256<<1))|0);
 HEAP16[(($258)>>1)]=0;
 var $259=$count;
 var $260=((($259)-(1))|0);
 $count=$260;
 var $261=$x;
 var $262=((($261)+(1))|0);
 $x=$262;
 var $263=$x;
 var $264=$line;
 var $265=(($264+($263<<1))|0);
 HEAP16[(($265)>>1)]=0;
 var $266=$count;
 var $267=((($266)-(1))|0);
 $count=$267;
 var $268=$x;
 var $269=((($268)+(1))|0);
 $x=$269;
 var $270=$x;
 var $271=$line;
 var $272=(($271+($270<<1))|0);
 HEAP16[(($272)>>1)]=0;
 var $273=$count;
 var $274=((($273)-(1))|0);
 $count=$274;
 var $275=$x;
 var $276=((($275)+(1))|0);
 $x=$276;
 var $277=$x;
 var $278=$line;
 var $279=(($278+($277<<1))|0);
 HEAP16[(($279)>>1)]=0;
 var $280=$count;
 var $281=((($280)-(1))|0);
 $count=$281;
 var $282=$x;
 var $283=((($282)+(1))|0);
 $x=$283;
 label=47;break;
 case 51: 
 label=52;break;
 case 52: 
 var $286=$count;
 var $287=($286|0)>0;
 if($287){label=53;break;}else{var $293=0;label=54;break;}
 case 53: 
 var $289=$x;
 var $290=$3;
 var $291=($289|0)<($290|0);
 var $293=$291;label=54;break;
 case 54: 
 var $293;
 if($293){label=55;break;}else{label=56;break;}
 case 55: 
 var $295=$x;
 var $296=$line;
 var $297=(($296+($295<<1))|0);
 HEAP16[(($297)>>1)]=0;
 var $298=$count;
 var $299=((($298)-(1))|0);
 $count=$299;
 var $300=$x;
 var $301=((($300)+(1))|0);
 $x=$301;
 label=52;break;
 case 56: 
 label=68;break;
 case 57: 
 label=58;break;
 case 58: 
 var $305=$count;
 var $306=$305&-8;
 var $307=($306|0)!=0;
 if($307){label=59;break;}else{var $314=0;label=60;break;}
 case 59: 
 var $309=$x;
 var $310=((($309)+(8))|0);
 var $311=$3;
 var $312=($310|0)<($311|0);
 var $314=$312;label=60;break;
 case 60: 
 var $314;
 if($314){label=61;break;}else{label=62;break;}
 case 61: 
 var $316=$x;
 var $317=$prevline;
 var $318=(($317+($316<<1))|0);
 var $319=HEAP16[(($318)>>1)];
 var $320=$x;
 var $321=$line;
 var $322=(($321+($320<<1))|0);
 HEAP16[(($322)>>1)]=$319;
 var $323=$count;
 var $324=((($323)-(1))|0);
 $count=$324;
 var $325=$x;
 var $326=((($325)+(1))|0);
 $x=$326;
 var $327=$x;
 var $328=$prevline;
 var $329=(($328+($327<<1))|0);
 var $330=HEAP16[(($329)>>1)];
 var $331=$x;
 var $332=$line;
 var $333=(($332+($331<<1))|0);
 HEAP16[(($333)>>1)]=$330;
 var $334=$count;
 var $335=((($334)-(1))|0);
 $count=$335;
 var $336=$x;
 var $337=((($336)+(1))|0);
 $x=$337;
 var $338=$x;
 var $339=$prevline;
 var $340=(($339+($338<<1))|0);
 var $341=HEAP16[(($340)>>1)];
 var $342=$x;
 var $343=$line;
 var $344=(($343+($342<<1))|0);
 HEAP16[(($344)>>1)]=$341;
 var $345=$count;
 var $346=((($345)-(1))|0);
 $count=$346;
 var $347=$x;
 var $348=((($347)+(1))|0);
 $x=$348;
 var $349=$x;
 var $350=$prevline;
 var $351=(($350+($349<<1))|0);
 var $352=HEAP16[(($351)>>1)];
 var $353=$x;
 var $354=$line;
 var $355=(($354+($353<<1))|0);
 HEAP16[(($355)>>1)]=$352;
 var $356=$count;
 var $357=((($356)-(1))|0);
 $count=$357;
 var $358=$x;
 var $359=((($358)+(1))|0);
 $x=$359;
 var $360=$x;
 var $361=$prevline;
 var $362=(($361+($360<<1))|0);
 var $363=HEAP16[(($362)>>1)];
 var $364=$x;
 var $365=$line;
 var $366=(($365+($364<<1))|0);
 HEAP16[(($366)>>1)]=$363;
 var $367=$count;
 var $368=((($367)-(1))|0);
 $count=$368;
 var $369=$x;
 var $370=((($369)+(1))|0);
 $x=$370;
 var $371=$x;
 var $372=$prevline;
 var $373=(($372+($371<<1))|0);
 var $374=HEAP16[(($373)>>1)];
 var $375=$x;
 var $376=$line;
 var $377=(($376+($375<<1))|0);
 HEAP16[(($377)>>1)]=$374;
 var $378=$count;
 var $379=((($378)-(1))|0);
 $count=$379;
 var $380=$x;
 var $381=((($380)+(1))|0);
 $x=$381;
 var $382=$x;
 var $383=$prevline;
 var $384=(($383+($382<<1))|0);
 var $385=HEAP16[(($384)>>1)];
 var $386=$x;
 var $387=$line;
 var $388=(($387+($386<<1))|0);
 HEAP16[(($388)>>1)]=$385;
 var $389=$count;
 var $390=((($389)-(1))|0);
 $count=$390;
 var $391=$x;
 var $392=((($391)+(1))|0);
 $x=$392;
 var $393=$x;
 var $394=$prevline;
 var $395=(($394+($393<<1))|0);
 var $396=HEAP16[(($395)>>1)];
 var $397=$x;
 var $398=$line;
 var $399=(($398+($397<<1))|0);
 HEAP16[(($399)>>1)]=$396;
 var $400=$count;
 var $401=((($400)-(1))|0);
 $count=$401;
 var $402=$x;
 var $403=((($402)+(1))|0);
 $x=$403;
 label=58;break;
 case 62: 
 label=63;break;
 case 63: 
 var $406=$count;
 var $407=($406|0)>0;
 if($407){label=64;break;}else{var $413=0;label=65;break;}
 case 64: 
 var $409=$x;
 var $410=$3;
 var $411=($409|0)<($410|0);
 var $413=$411;label=65;break;
 case 65: 
 var $413;
 if($413){label=66;break;}else{label=67;break;}
 case 66: 
 var $415=$x;
 var $416=$prevline;
 var $417=(($416+($415<<1))|0);
 var $418=HEAP16[(($417)>>1)];
 var $419=$x;
 var $420=$line;
 var $421=(($420+($419<<1))|0);
 HEAP16[(($421)>>1)]=$418;
 var $422=$count;
 var $423=((($422)-(1))|0);
 $count=$423;
 var $424=$x;
 var $425=((($424)+(1))|0);
 $x=$425;
 label=63;break;
 case 67: 
 label=68;break;
 case 68: 
 label=344;break;
 case 69: 
 var $429=$prevline;
 var $430=($429|0)==0;
 if($430){label=70;break;}else{label=81;break;}
 case 70: 
 label=71;break;
 case 71: 
 var $433=$count;
 var $434=$433&-8;
 var $435=($434|0)!=0;
 if($435){label=72;break;}else{var $442=0;label=73;break;}
 case 72: 
 var $437=$x;
 var $438=((($437)+(8))|0);
 var $439=$3;
 var $440=($438|0)<($439|0);
 var $442=$440;label=73;break;
 case 73: 
 var $442;
 if($442){label=74;break;}else{label=75;break;}
 case 74: 
 var $444=$mix;
 var $445=$x;
 var $446=$line;
 var $447=(($446+($445<<1))|0);
 HEAP16[(($447)>>1)]=$444;
 var $448=$count;
 var $449=((($448)-(1))|0);
 $count=$449;
 var $450=$x;
 var $451=((($450)+(1))|0);
 $x=$451;
 var $452=$mix;
 var $453=$x;
 var $454=$line;
 var $455=(($454+($453<<1))|0);
 HEAP16[(($455)>>1)]=$452;
 var $456=$count;
 var $457=((($456)-(1))|0);
 $count=$457;
 var $458=$x;
 var $459=((($458)+(1))|0);
 $x=$459;
 var $460=$mix;
 var $461=$x;
 var $462=$line;
 var $463=(($462+($461<<1))|0);
 HEAP16[(($463)>>1)]=$460;
 var $464=$count;
 var $465=((($464)-(1))|0);
 $count=$465;
 var $466=$x;
 var $467=((($466)+(1))|0);
 $x=$467;
 var $468=$mix;
 var $469=$x;
 var $470=$line;
 var $471=(($470+($469<<1))|0);
 HEAP16[(($471)>>1)]=$468;
 var $472=$count;
 var $473=((($472)-(1))|0);
 $count=$473;
 var $474=$x;
 var $475=((($474)+(1))|0);
 $x=$475;
 var $476=$mix;
 var $477=$x;
 var $478=$line;
 var $479=(($478+($477<<1))|0);
 HEAP16[(($479)>>1)]=$476;
 var $480=$count;
 var $481=((($480)-(1))|0);
 $count=$481;
 var $482=$x;
 var $483=((($482)+(1))|0);
 $x=$483;
 var $484=$mix;
 var $485=$x;
 var $486=$line;
 var $487=(($486+($485<<1))|0);
 HEAP16[(($487)>>1)]=$484;
 var $488=$count;
 var $489=((($488)-(1))|0);
 $count=$489;
 var $490=$x;
 var $491=((($490)+(1))|0);
 $x=$491;
 var $492=$mix;
 var $493=$x;
 var $494=$line;
 var $495=(($494+($493<<1))|0);
 HEAP16[(($495)>>1)]=$492;
 var $496=$count;
 var $497=((($496)-(1))|0);
 $count=$497;
 var $498=$x;
 var $499=((($498)+(1))|0);
 $x=$499;
 var $500=$mix;
 var $501=$x;
 var $502=$line;
 var $503=(($502+($501<<1))|0);
 HEAP16[(($503)>>1)]=$500;
 var $504=$count;
 var $505=((($504)-(1))|0);
 $count=$505;
 var $506=$x;
 var $507=((($506)+(1))|0);
 $x=$507;
 label=71;break;
 case 75: 
 label=76;break;
 case 76: 
 var $510=$count;
 var $511=($510|0)>0;
 if($511){label=77;break;}else{var $517=0;label=78;break;}
 case 77: 
 var $513=$x;
 var $514=$3;
 var $515=($513|0)<($514|0);
 var $517=$515;label=78;break;
 case 78: 
 var $517;
 if($517){label=79;break;}else{label=80;break;}
 case 79: 
 var $519=$mix;
 var $520=$x;
 var $521=$line;
 var $522=(($521+($520<<1))|0);
 HEAP16[(($522)>>1)]=$519;
 var $523=$count;
 var $524=((($523)-(1))|0);
 $count=$524;
 var $525=$x;
 var $526=((($525)+(1))|0);
 $x=$526;
 label=76;break;
 case 80: 
 label=92;break;
 case 81: 
 label=82;break;
 case 82: 
 var $530=$count;
 var $531=$530&-8;
 var $532=($531|0)!=0;
 if($532){label=83;break;}else{var $539=0;label=84;break;}
 case 83: 
 var $534=$x;
 var $535=((($534)+(8))|0);
 var $536=$3;
 var $537=($535|0)<($536|0);
 var $539=$537;label=84;break;
 case 84: 
 var $539;
 if($539){label=85;break;}else{label=86;break;}
 case 85: 
 var $541=$x;
 var $542=$prevline;
 var $543=(($542+($541<<1))|0);
 var $544=HEAP16[(($543)>>1)];
 var $545=($544&65535);
 var $546=$mix;
 var $547=($546&65535);
 var $548=$545^$547;
 var $549=(($548)&65535);
 var $550=$x;
 var $551=$line;
 var $552=(($551+($550<<1))|0);
 HEAP16[(($552)>>1)]=$549;
 var $553=$count;
 var $554=((($553)-(1))|0);
 $count=$554;
 var $555=$x;
 var $556=((($555)+(1))|0);
 $x=$556;
 var $557=$x;
 var $558=$prevline;
 var $559=(($558+($557<<1))|0);
 var $560=HEAP16[(($559)>>1)];
 var $561=($560&65535);
 var $562=$mix;
 var $563=($562&65535);
 var $564=$561^$563;
 var $565=(($564)&65535);
 var $566=$x;
 var $567=$line;
 var $568=(($567+($566<<1))|0);
 HEAP16[(($568)>>1)]=$565;
 var $569=$count;
 var $570=((($569)-(1))|0);
 $count=$570;
 var $571=$x;
 var $572=((($571)+(1))|0);
 $x=$572;
 var $573=$x;
 var $574=$prevline;
 var $575=(($574+($573<<1))|0);
 var $576=HEAP16[(($575)>>1)];
 var $577=($576&65535);
 var $578=$mix;
 var $579=($578&65535);
 var $580=$577^$579;
 var $581=(($580)&65535);
 var $582=$x;
 var $583=$line;
 var $584=(($583+($582<<1))|0);
 HEAP16[(($584)>>1)]=$581;
 var $585=$count;
 var $586=((($585)-(1))|0);
 $count=$586;
 var $587=$x;
 var $588=((($587)+(1))|0);
 $x=$588;
 var $589=$x;
 var $590=$prevline;
 var $591=(($590+($589<<1))|0);
 var $592=HEAP16[(($591)>>1)];
 var $593=($592&65535);
 var $594=$mix;
 var $595=($594&65535);
 var $596=$593^$595;
 var $597=(($596)&65535);
 var $598=$x;
 var $599=$line;
 var $600=(($599+($598<<1))|0);
 HEAP16[(($600)>>1)]=$597;
 var $601=$count;
 var $602=((($601)-(1))|0);
 $count=$602;
 var $603=$x;
 var $604=((($603)+(1))|0);
 $x=$604;
 var $605=$x;
 var $606=$prevline;
 var $607=(($606+($605<<1))|0);
 var $608=HEAP16[(($607)>>1)];
 var $609=($608&65535);
 var $610=$mix;
 var $611=($610&65535);
 var $612=$609^$611;
 var $613=(($612)&65535);
 var $614=$x;
 var $615=$line;
 var $616=(($615+($614<<1))|0);
 HEAP16[(($616)>>1)]=$613;
 var $617=$count;
 var $618=((($617)-(1))|0);
 $count=$618;
 var $619=$x;
 var $620=((($619)+(1))|0);
 $x=$620;
 var $621=$x;
 var $622=$prevline;
 var $623=(($622+($621<<1))|0);
 var $624=HEAP16[(($623)>>1)];
 var $625=($624&65535);
 var $626=$mix;
 var $627=($626&65535);
 var $628=$625^$627;
 var $629=(($628)&65535);
 var $630=$x;
 var $631=$line;
 var $632=(($631+($630<<1))|0);
 HEAP16[(($632)>>1)]=$629;
 var $633=$count;
 var $634=((($633)-(1))|0);
 $count=$634;
 var $635=$x;
 var $636=((($635)+(1))|0);
 $x=$636;
 var $637=$x;
 var $638=$prevline;
 var $639=(($638+($637<<1))|0);
 var $640=HEAP16[(($639)>>1)];
 var $641=($640&65535);
 var $642=$mix;
 var $643=($642&65535);
 var $644=$641^$643;
 var $645=(($644)&65535);
 var $646=$x;
 var $647=$line;
 var $648=(($647+($646<<1))|0);
 HEAP16[(($648)>>1)]=$645;
 var $649=$count;
 var $650=((($649)-(1))|0);
 $count=$650;
 var $651=$x;
 var $652=((($651)+(1))|0);
 $x=$652;
 var $653=$x;
 var $654=$prevline;
 var $655=(($654+($653<<1))|0);
 var $656=HEAP16[(($655)>>1)];
 var $657=($656&65535);
 var $658=$mix;
 var $659=($658&65535);
 var $660=$657^$659;
 var $661=(($660)&65535);
 var $662=$x;
 var $663=$line;
 var $664=(($663+($662<<1))|0);
 HEAP16[(($664)>>1)]=$661;
 var $665=$count;
 var $666=((($665)-(1))|0);
 $count=$666;
 var $667=$x;
 var $668=((($667)+(1))|0);
 $x=$668;
 label=82;break;
 case 86: 
 label=87;break;
 case 87: 
 var $671=$count;
 var $672=($671|0)>0;
 if($672){label=88;break;}else{var $678=0;label=89;break;}
 case 88: 
 var $674=$x;
 var $675=$3;
 var $676=($674|0)<($675|0);
 var $678=$676;label=89;break;
 case 89: 
 var $678;
 if($678){label=90;break;}else{label=91;break;}
 case 90: 
 var $680=$x;
 var $681=$prevline;
 var $682=(($681+($680<<1))|0);
 var $683=HEAP16[(($682)>>1)];
 var $684=($683&65535);
 var $685=$mix;
 var $686=($685&65535);
 var $687=$684^$686;
 var $688=(($687)&65535);
 var $689=$x;
 var $690=$line;
 var $691=(($690+($689<<1))|0);
 HEAP16[(($691)>>1)]=$688;
 var $692=$count;
 var $693=((($692)-(1))|0);
 $count=$693;
 var $694=$x;
 var $695=((($694)+(1))|0);
 $x=$695;
 label=87;break;
 case 91: 
 label=92;break;
 case 92: 
 label=344;break;
 case 93: 
 var $699=$prevline;
 var $700=($699|0)==0;
 if($700){label=94;break;}else{label=177;break;}
 case 94: 
 label=95;break;
 case 95: 
 var $703=$count;
 var $704=$703&-8;
 var $705=($704|0)!=0;
 if($705){label=96;break;}else{var $712=0;label=97;break;}
 case 96: 
 var $707=$x;
 var $708=((($707)+(8))|0);
 var $709=$3;
 var $710=($708|0)<($709|0);
 var $712=$710;label=97;break;
 case 97: 
 var $712;
 if($712){label=98;break;}else{label=163;break;}
 case 98: 
 var $714=$mixmask;
 var $715=($714&255);
 var $716=$715<<1;
 var $717=(($716)&255);
 $mixmask=$717;
 var $718=$mixmask;
 var $719=($718&255);
 var $720=($719|0)==0;
 if($720){label=99;break;}else{label=103;break;}
 case 99: 
 var $722=$fom_mask;
 var $723=($722|0)!=0;
 if($723){label=100;break;}else{label=101;break;}
 case 100: 
 var $725=$fom_mask;
 var $732=$725;label=102;break;
 case 101: 
 var $727=$5;
 var $728=(($727+1)|0);
 $5=$728;
 var $729=HEAP8[($727)];
 var $730=($729&255);
 var $732=$730;label=102;break;
 case 102: 
 var $732;
 var $733=(($732)&255);
 $mask=$733;
 $mixmask=1;
 label=103;break;
 case 103: 
 var $735=$mask;
 var $736=($735&255);
 var $737=$mixmask;
 var $738=($737&255);
 var $739=$736&$738;
 var $740=($739|0)!=0;
 if($740){label=104;break;}else{label=105;break;}
 case 104: 
 var $742=$mix;
 var $743=$x;
 var $744=$line;
 var $745=(($744+($743<<1))|0);
 HEAP16[(($745)>>1)]=$742;
 label=106;break;
 case 105: 
 var $747=$x;
 var $748=$line;
 var $749=(($748+($747<<1))|0);
 HEAP16[(($749)>>1)]=0;
 label=106;break;
 case 106: 
 var $751=$count;
 var $752=((($751)-(1))|0);
 $count=$752;
 var $753=$x;
 var $754=((($753)+(1))|0);
 $x=$754;
 var $755=$mixmask;
 var $756=($755&255);
 var $757=$756<<1;
 var $758=(($757)&255);
 $mixmask=$758;
 var $759=$mixmask;
 var $760=($759&255);
 var $761=($760|0)==0;
 if($761){label=107;break;}else{label=111;break;}
 case 107: 
 var $763=$fom_mask;
 var $764=($763|0)!=0;
 if($764){label=108;break;}else{label=109;break;}
 case 108: 
 var $766=$fom_mask;
 var $773=$766;label=110;break;
 case 109: 
 var $768=$5;
 var $769=(($768+1)|0);
 $5=$769;
 var $770=HEAP8[($768)];
 var $771=($770&255);
 var $773=$771;label=110;break;
 case 110: 
 var $773;
 var $774=(($773)&255);
 $mask=$774;
 $mixmask=1;
 label=111;break;
 case 111: 
 var $776=$mask;
 var $777=($776&255);
 var $778=$mixmask;
 var $779=($778&255);
 var $780=$777&$779;
 var $781=($780|0)!=0;
 if($781){label=112;break;}else{label=113;break;}
 case 112: 
 var $783=$mix;
 var $784=$x;
 var $785=$line;
 var $786=(($785+($784<<1))|0);
 HEAP16[(($786)>>1)]=$783;
 label=114;break;
 case 113: 
 var $788=$x;
 var $789=$line;
 var $790=(($789+($788<<1))|0);
 HEAP16[(($790)>>1)]=0;
 label=114;break;
 case 114: 
 var $792=$count;
 var $793=((($792)-(1))|0);
 $count=$793;
 var $794=$x;
 var $795=((($794)+(1))|0);
 $x=$795;
 var $796=$mixmask;
 var $797=($796&255);
 var $798=$797<<1;
 var $799=(($798)&255);
 $mixmask=$799;
 var $800=$mixmask;
 var $801=($800&255);
 var $802=($801|0)==0;
 if($802){label=115;break;}else{label=119;break;}
 case 115: 
 var $804=$fom_mask;
 var $805=($804|0)!=0;
 if($805){label=116;break;}else{label=117;break;}
 case 116: 
 var $807=$fom_mask;
 var $814=$807;label=118;break;
 case 117: 
 var $809=$5;
 var $810=(($809+1)|0);
 $5=$810;
 var $811=HEAP8[($809)];
 var $812=($811&255);
 var $814=$812;label=118;break;
 case 118: 
 var $814;
 var $815=(($814)&255);
 $mask=$815;
 $mixmask=1;
 label=119;break;
 case 119: 
 var $817=$mask;
 var $818=($817&255);
 var $819=$mixmask;
 var $820=($819&255);
 var $821=$818&$820;
 var $822=($821|0)!=0;
 if($822){label=120;break;}else{label=121;break;}
 case 120: 
 var $824=$mix;
 var $825=$x;
 var $826=$line;
 var $827=(($826+($825<<1))|0);
 HEAP16[(($827)>>1)]=$824;
 label=122;break;
 case 121: 
 var $829=$x;
 var $830=$line;
 var $831=(($830+($829<<1))|0);
 HEAP16[(($831)>>1)]=0;
 label=122;break;
 case 122: 
 var $833=$count;
 var $834=((($833)-(1))|0);
 $count=$834;
 var $835=$x;
 var $836=((($835)+(1))|0);
 $x=$836;
 var $837=$mixmask;
 var $838=($837&255);
 var $839=$838<<1;
 var $840=(($839)&255);
 $mixmask=$840;
 var $841=$mixmask;
 var $842=($841&255);
 var $843=($842|0)==0;
 if($843){label=123;break;}else{label=127;break;}
 case 123: 
 var $845=$fom_mask;
 var $846=($845|0)!=0;
 if($846){label=124;break;}else{label=125;break;}
 case 124: 
 var $848=$fom_mask;
 var $855=$848;label=126;break;
 case 125: 
 var $850=$5;
 var $851=(($850+1)|0);
 $5=$851;
 var $852=HEAP8[($850)];
 var $853=($852&255);
 var $855=$853;label=126;break;
 case 126: 
 var $855;
 var $856=(($855)&255);
 $mask=$856;
 $mixmask=1;
 label=127;break;
 case 127: 
 var $858=$mask;
 var $859=($858&255);
 var $860=$mixmask;
 var $861=($860&255);
 var $862=$859&$861;
 var $863=($862|0)!=0;
 if($863){label=128;break;}else{label=129;break;}
 case 128: 
 var $865=$mix;
 var $866=$x;
 var $867=$line;
 var $868=(($867+($866<<1))|0);
 HEAP16[(($868)>>1)]=$865;
 label=130;break;
 case 129: 
 var $870=$x;
 var $871=$line;
 var $872=(($871+($870<<1))|0);
 HEAP16[(($872)>>1)]=0;
 label=130;break;
 case 130: 
 var $874=$count;
 var $875=((($874)-(1))|0);
 $count=$875;
 var $876=$x;
 var $877=((($876)+(1))|0);
 $x=$877;
 var $878=$mixmask;
 var $879=($878&255);
 var $880=$879<<1;
 var $881=(($880)&255);
 $mixmask=$881;
 var $882=$mixmask;
 var $883=($882&255);
 var $884=($883|0)==0;
 if($884){label=131;break;}else{label=135;break;}
 case 131: 
 var $886=$fom_mask;
 var $887=($886|0)!=0;
 if($887){label=132;break;}else{label=133;break;}
 case 132: 
 var $889=$fom_mask;
 var $896=$889;label=134;break;
 case 133: 
 var $891=$5;
 var $892=(($891+1)|0);
 $5=$892;
 var $893=HEAP8[($891)];
 var $894=($893&255);
 var $896=$894;label=134;break;
 case 134: 
 var $896;
 var $897=(($896)&255);
 $mask=$897;
 $mixmask=1;
 label=135;break;
 case 135: 
 var $899=$mask;
 var $900=($899&255);
 var $901=$mixmask;
 var $902=($901&255);
 var $903=$900&$902;
 var $904=($903|0)!=0;
 if($904){label=136;break;}else{label=137;break;}
 case 136: 
 var $906=$mix;
 var $907=$x;
 var $908=$line;
 var $909=(($908+($907<<1))|0);
 HEAP16[(($909)>>1)]=$906;
 label=138;break;
 case 137: 
 var $911=$x;
 var $912=$line;
 var $913=(($912+($911<<1))|0);
 HEAP16[(($913)>>1)]=0;
 label=138;break;
 case 138: 
 var $915=$count;
 var $916=((($915)-(1))|0);
 $count=$916;
 var $917=$x;
 var $918=((($917)+(1))|0);
 $x=$918;
 var $919=$mixmask;
 var $920=($919&255);
 var $921=$920<<1;
 var $922=(($921)&255);
 $mixmask=$922;
 var $923=$mixmask;
 var $924=($923&255);
 var $925=($924|0)==0;
 if($925){label=139;break;}else{label=143;break;}
 case 139: 
 var $927=$fom_mask;
 var $928=($927|0)!=0;
 if($928){label=140;break;}else{label=141;break;}
 case 140: 
 var $930=$fom_mask;
 var $937=$930;label=142;break;
 case 141: 
 var $932=$5;
 var $933=(($932+1)|0);
 $5=$933;
 var $934=HEAP8[($932)];
 var $935=($934&255);
 var $937=$935;label=142;break;
 case 142: 
 var $937;
 var $938=(($937)&255);
 $mask=$938;
 $mixmask=1;
 label=143;break;
 case 143: 
 var $940=$mask;
 var $941=($940&255);
 var $942=$mixmask;
 var $943=($942&255);
 var $944=$941&$943;
 var $945=($944|0)!=0;
 if($945){label=144;break;}else{label=145;break;}
 case 144: 
 var $947=$mix;
 var $948=$x;
 var $949=$line;
 var $950=(($949+($948<<1))|0);
 HEAP16[(($950)>>1)]=$947;
 label=146;break;
 case 145: 
 var $952=$x;
 var $953=$line;
 var $954=(($953+($952<<1))|0);
 HEAP16[(($954)>>1)]=0;
 label=146;break;
 case 146: 
 var $956=$count;
 var $957=((($956)-(1))|0);
 $count=$957;
 var $958=$x;
 var $959=((($958)+(1))|0);
 $x=$959;
 var $960=$mixmask;
 var $961=($960&255);
 var $962=$961<<1;
 var $963=(($962)&255);
 $mixmask=$963;
 var $964=$mixmask;
 var $965=($964&255);
 var $966=($965|0)==0;
 if($966){label=147;break;}else{label=151;break;}
 case 147: 
 var $968=$fom_mask;
 var $969=($968|0)!=0;
 if($969){label=148;break;}else{label=149;break;}
 case 148: 
 var $971=$fom_mask;
 var $978=$971;label=150;break;
 case 149: 
 var $973=$5;
 var $974=(($973+1)|0);
 $5=$974;
 var $975=HEAP8[($973)];
 var $976=($975&255);
 var $978=$976;label=150;break;
 case 150: 
 var $978;
 var $979=(($978)&255);
 $mask=$979;
 $mixmask=1;
 label=151;break;
 case 151: 
 var $981=$mask;
 var $982=($981&255);
 var $983=$mixmask;
 var $984=($983&255);
 var $985=$982&$984;
 var $986=($985|0)!=0;
 if($986){label=152;break;}else{label=153;break;}
 case 152: 
 var $988=$mix;
 var $989=$x;
 var $990=$line;
 var $991=(($990+($989<<1))|0);
 HEAP16[(($991)>>1)]=$988;
 label=154;break;
 case 153: 
 var $993=$x;
 var $994=$line;
 var $995=(($994+($993<<1))|0);
 HEAP16[(($995)>>1)]=0;
 label=154;break;
 case 154: 
 var $997=$count;
 var $998=((($997)-(1))|0);
 $count=$998;
 var $999=$x;
 var $1000=((($999)+(1))|0);
 $x=$1000;
 var $1001=$mixmask;
 var $1002=($1001&255);
 var $1003=$1002<<1;
 var $1004=(($1003)&255);
 $mixmask=$1004;
 var $1005=$mixmask;
 var $1006=($1005&255);
 var $1007=($1006|0)==0;
 if($1007){label=155;break;}else{label=159;break;}
 case 155: 
 var $1009=$fom_mask;
 var $1010=($1009|0)!=0;
 if($1010){label=156;break;}else{label=157;break;}
 case 156: 
 var $1012=$fom_mask;
 var $1019=$1012;label=158;break;
 case 157: 
 var $1014=$5;
 var $1015=(($1014+1)|0);
 $5=$1015;
 var $1016=HEAP8[($1014)];
 var $1017=($1016&255);
 var $1019=$1017;label=158;break;
 case 158: 
 var $1019;
 var $1020=(($1019)&255);
 $mask=$1020;
 $mixmask=1;
 label=159;break;
 case 159: 
 var $1022=$mask;
 var $1023=($1022&255);
 var $1024=$mixmask;
 var $1025=($1024&255);
 var $1026=$1023&$1025;
 var $1027=($1026|0)!=0;
 if($1027){label=160;break;}else{label=161;break;}
 case 160: 
 var $1029=$mix;
 var $1030=$x;
 var $1031=$line;
 var $1032=(($1031+($1030<<1))|0);
 HEAP16[(($1032)>>1)]=$1029;
 label=162;break;
 case 161: 
 var $1034=$x;
 var $1035=$line;
 var $1036=(($1035+($1034<<1))|0);
 HEAP16[(($1036)>>1)]=0;
 label=162;break;
 case 162: 
 var $1038=$count;
 var $1039=((($1038)-(1))|0);
 $count=$1039;
 var $1040=$x;
 var $1041=((($1040)+(1))|0);
 $x=$1041;
 label=95;break;
 case 163: 
 label=164;break;
 case 164: 
 var $1044=$count;
 var $1045=($1044|0)>0;
 if($1045){label=165;break;}else{var $1051=0;label=166;break;}
 case 165: 
 var $1047=$x;
 var $1048=$3;
 var $1049=($1047|0)<($1048|0);
 var $1051=$1049;label=166;break;
 case 166: 
 var $1051;
 if($1051){label=167;break;}else{label=176;break;}
 case 167: 
 var $1053=$mixmask;
 var $1054=($1053&255);
 var $1055=$1054<<1;
 var $1056=(($1055)&255);
 $mixmask=$1056;
 var $1057=$mixmask;
 var $1058=($1057&255);
 var $1059=($1058|0)==0;
 if($1059){label=168;break;}else{label=172;break;}
 case 168: 
 var $1061=$fom_mask;
 var $1062=($1061|0)!=0;
 if($1062){label=169;break;}else{label=170;break;}
 case 169: 
 var $1064=$fom_mask;
 var $1071=$1064;label=171;break;
 case 170: 
 var $1066=$5;
 var $1067=(($1066+1)|0);
 $5=$1067;
 var $1068=HEAP8[($1066)];
 var $1069=($1068&255);
 var $1071=$1069;label=171;break;
 case 171: 
 var $1071;
 var $1072=(($1071)&255);
 $mask=$1072;
 $mixmask=1;
 label=172;break;
 case 172: 
 var $1074=$mask;
 var $1075=($1074&255);
 var $1076=$mixmask;
 var $1077=($1076&255);
 var $1078=$1075&$1077;
 var $1079=($1078|0)!=0;
 if($1079){label=173;break;}else{label=174;break;}
 case 173: 
 var $1081=$mix;
 var $1082=$x;
 var $1083=$line;
 var $1084=(($1083+($1082<<1))|0);
 HEAP16[(($1084)>>1)]=$1081;
 label=175;break;
 case 174: 
 var $1086=$x;
 var $1087=$line;
 var $1088=(($1087+($1086<<1))|0);
 HEAP16[(($1088)>>1)]=0;
 label=175;break;
 case 175: 
 var $1090=$count;
 var $1091=((($1090)-(1))|0);
 $count=$1091;
 var $1092=$x;
 var $1093=((($1092)+(1))|0);
 $x=$1093;
 label=164;break;
 case 176: 
 label=260;break;
 case 177: 
 label=178;break;
 case 178: 
 var $1097=$count;
 var $1098=$1097&-8;
 var $1099=($1098|0)!=0;
 if($1099){label=179;break;}else{var $1106=0;label=180;break;}
 case 179: 
 var $1101=$x;
 var $1102=((($1101)+(8))|0);
 var $1103=$3;
 var $1104=($1102|0)<($1103|0);
 var $1106=$1104;label=180;break;
 case 180: 
 var $1106;
 if($1106){label=181;break;}else{label=246;break;}
 case 181: 
 var $1108=$mixmask;
 var $1109=($1108&255);
 var $1110=$1109<<1;
 var $1111=(($1110)&255);
 $mixmask=$1111;
 var $1112=$mixmask;
 var $1113=($1112&255);
 var $1114=($1113|0)==0;
 if($1114){label=182;break;}else{label=186;break;}
 case 182: 
 var $1116=$fom_mask;
 var $1117=($1116|0)!=0;
 if($1117){label=183;break;}else{label=184;break;}
 case 183: 
 var $1119=$fom_mask;
 var $1126=$1119;label=185;break;
 case 184: 
 var $1121=$5;
 var $1122=(($1121+1)|0);
 $5=$1122;
 var $1123=HEAP8[($1121)];
 var $1124=($1123&255);
 var $1126=$1124;label=185;break;
 case 185: 
 var $1126;
 var $1127=(($1126)&255);
 $mask=$1127;
 $mixmask=1;
 label=186;break;
 case 186: 
 var $1129=$mask;
 var $1130=($1129&255);
 var $1131=$mixmask;
 var $1132=($1131&255);
 var $1133=$1130&$1132;
 var $1134=($1133|0)!=0;
 if($1134){label=187;break;}else{label=188;break;}
 case 187: 
 var $1136=$x;
 var $1137=$prevline;
 var $1138=(($1137+($1136<<1))|0);
 var $1139=HEAP16[(($1138)>>1)];
 var $1140=($1139&65535);
 var $1141=$mix;
 var $1142=($1141&65535);
 var $1143=$1140^$1142;
 var $1144=(($1143)&65535);
 var $1145=$x;
 var $1146=$line;
 var $1147=(($1146+($1145<<1))|0);
 HEAP16[(($1147)>>1)]=$1144;
 label=189;break;
 case 188: 
 var $1149=$x;
 var $1150=$prevline;
 var $1151=(($1150+($1149<<1))|0);
 var $1152=HEAP16[(($1151)>>1)];
 var $1153=$x;
 var $1154=$line;
 var $1155=(($1154+($1153<<1))|0);
 HEAP16[(($1155)>>1)]=$1152;
 label=189;break;
 case 189: 
 var $1157=$count;
 var $1158=((($1157)-(1))|0);
 $count=$1158;
 var $1159=$x;
 var $1160=((($1159)+(1))|0);
 $x=$1160;
 var $1161=$mixmask;
 var $1162=($1161&255);
 var $1163=$1162<<1;
 var $1164=(($1163)&255);
 $mixmask=$1164;
 var $1165=$mixmask;
 var $1166=($1165&255);
 var $1167=($1166|0)==0;
 if($1167){label=190;break;}else{label=194;break;}
 case 190: 
 var $1169=$fom_mask;
 var $1170=($1169|0)!=0;
 if($1170){label=191;break;}else{label=192;break;}
 case 191: 
 var $1172=$fom_mask;
 var $1179=$1172;label=193;break;
 case 192: 
 var $1174=$5;
 var $1175=(($1174+1)|0);
 $5=$1175;
 var $1176=HEAP8[($1174)];
 var $1177=($1176&255);
 var $1179=$1177;label=193;break;
 case 193: 
 var $1179;
 var $1180=(($1179)&255);
 $mask=$1180;
 $mixmask=1;
 label=194;break;
 case 194: 
 var $1182=$mask;
 var $1183=($1182&255);
 var $1184=$mixmask;
 var $1185=($1184&255);
 var $1186=$1183&$1185;
 var $1187=($1186|0)!=0;
 if($1187){label=195;break;}else{label=196;break;}
 case 195: 
 var $1189=$x;
 var $1190=$prevline;
 var $1191=(($1190+($1189<<1))|0);
 var $1192=HEAP16[(($1191)>>1)];
 var $1193=($1192&65535);
 var $1194=$mix;
 var $1195=($1194&65535);
 var $1196=$1193^$1195;
 var $1197=(($1196)&65535);
 var $1198=$x;
 var $1199=$line;
 var $1200=(($1199+($1198<<1))|0);
 HEAP16[(($1200)>>1)]=$1197;
 label=197;break;
 case 196: 
 var $1202=$x;
 var $1203=$prevline;
 var $1204=(($1203+($1202<<1))|0);
 var $1205=HEAP16[(($1204)>>1)];
 var $1206=$x;
 var $1207=$line;
 var $1208=(($1207+($1206<<1))|0);
 HEAP16[(($1208)>>1)]=$1205;
 label=197;break;
 case 197: 
 var $1210=$count;
 var $1211=((($1210)-(1))|0);
 $count=$1211;
 var $1212=$x;
 var $1213=((($1212)+(1))|0);
 $x=$1213;
 var $1214=$mixmask;
 var $1215=($1214&255);
 var $1216=$1215<<1;
 var $1217=(($1216)&255);
 $mixmask=$1217;
 var $1218=$mixmask;
 var $1219=($1218&255);
 var $1220=($1219|0)==0;
 if($1220){label=198;break;}else{label=202;break;}
 case 198: 
 var $1222=$fom_mask;
 var $1223=($1222|0)!=0;
 if($1223){label=199;break;}else{label=200;break;}
 case 199: 
 var $1225=$fom_mask;
 var $1232=$1225;label=201;break;
 case 200: 
 var $1227=$5;
 var $1228=(($1227+1)|0);
 $5=$1228;
 var $1229=HEAP8[($1227)];
 var $1230=($1229&255);
 var $1232=$1230;label=201;break;
 case 201: 
 var $1232;
 var $1233=(($1232)&255);
 $mask=$1233;
 $mixmask=1;
 label=202;break;
 case 202: 
 var $1235=$mask;
 var $1236=($1235&255);
 var $1237=$mixmask;
 var $1238=($1237&255);
 var $1239=$1236&$1238;
 var $1240=($1239|0)!=0;
 if($1240){label=203;break;}else{label=204;break;}
 case 203: 
 var $1242=$x;
 var $1243=$prevline;
 var $1244=(($1243+($1242<<1))|0);
 var $1245=HEAP16[(($1244)>>1)];
 var $1246=($1245&65535);
 var $1247=$mix;
 var $1248=($1247&65535);
 var $1249=$1246^$1248;
 var $1250=(($1249)&65535);
 var $1251=$x;
 var $1252=$line;
 var $1253=(($1252+($1251<<1))|0);
 HEAP16[(($1253)>>1)]=$1250;
 label=205;break;
 case 204: 
 var $1255=$x;
 var $1256=$prevline;
 var $1257=(($1256+($1255<<1))|0);
 var $1258=HEAP16[(($1257)>>1)];
 var $1259=$x;
 var $1260=$line;
 var $1261=(($1260+($1259<<1))|0);
 HEAP16[(($1261)>>1)]=$1258;
 label=205;break;
 case 205: 
 var $1263=$count;
 var $1264=((($1263)-(1))|0);
 $count=$1264;
 var $1265=$x;
 var $1266=((($1265)+(1))|0);
 $x=$1266;
 var $1267=$mixmask;
 var $1268=($1267&255);
 var $1269=$1268<<1;
 var $1270=(($1269)&255);
 $mixmask=$1270;
 var $1271=$mixmask;
 var $1272=($1271&255);
 var $1273=($1272|0)==0;
 if($1273){label=206;break;}else{label=210;break;}
 case 206: 
 var $1275=$fom_mask;
 var $1276=($1275|0)!=0;
 if($1276){label=207;break;}else{label=208;break;}
 case 207: 
 var $1278=$fom_mask;
 var $1285=$1278;label=209;break;
 case 208: 
 var $1280=$5;
 var $1281=(($1280+1)|0);
 $5=$1281;
 var $1282=HEAP8[($1280)];
 var $1283=($1282&255);
 var $1285=$1283;label=209;break;
 case 209: 
 var $1285;
 var $1286=(($1285)&255);
 $mask=$1286;
 $mixmask=1;
 label=210;break;
 case 210: 
 var $1288=$mask;
 var $1289=($1288&255);
 var $1290=$mixmask;
 var $1291=($1290&255);
 var $1292=$1289&$1291;
 var $1293=($1292|0)!=0;
 if($1293){label=211;break;}else{label=212;break;}
 case 211: 
 var $1295=$x;
 var $1296=$prevline;
 var $1297=(($1296+($1295<<1))|0);
 var $1298=HEAP16[(($1297)>>1)];
 var $1299=($1298&65535);
 var $1300=$mix;
 var $1301=($1300&65535);
 var $1302=$1299^$1301;
 var $1303=(($1302)&65535);
 var $1304=$x;
 var $1305=$line;
 var $1306=(($1305+($1304<<1))|0);
 HEAP16[(($1306)>>1)]=$1303;
 label=213;break;
 case 212: 
 var $1308=$x;
 var $1309=$prevline;
 var $1310=(($1309+($1308<<1))|0);
 var $1311=HEAP16[(($1310)>>1)];
 var $1312=$x;
 var $1313=$line;
 var $1314=(($1313+($1312<<1))|0);
 HEAP16[(($1314)>>1)]=$1311;
 label=213;break;
 case 213: 
 var $1316=$count;
 var $1317=((($1316)-(1))|0);
 $count=$1317;
 var $1318=$x;
 var $1319=((($1318)+(1))|0);
 $x=$1319;
 var $1320=$mixmask;
 var $1321=($1320&255);
 var $1322=$1321<<1;
 var $1323=(($1322)&255);
 $mixmask=$1323;
 var $1324=$mixmask;
 var $1325=($1324&255);
 var $1326=($1325|0)==0;
 if($1326){label=214;break;}else{label=218;break;}
 case 214: 
 var $1328=$fom_mask;
 var $1329=($1328|0)!=0;
 if($1329){label=215;break;}else{label=216;break;}
 case 215: 
 var $1331=$fom_mask;
 var $1338=$1331;label=217;break;
 case 216: 
 var $1333=$5;
 var $1334=(($1333+1)|0);
 $5=$1334;
 var $1335=HEAP8[($1333)];
 var $1336=($1335&255);
 var $1338=$1336;label=217;break;
 case 217: 
 var $1338;
 var $1339=(($1338)&255);
 $mask=$1339;
 $mixmask=1;
 label=218;break;
 case 218: 
 var $1341=$mask;
 var $1342=($1341&255);
 var $1343=$mixmask;
 var $1344=($1343&255);
 var $1345=$1342&$1344;
 var $1346=($1345|0)!=0;
 if($1346){label=219;break;}else{label=220;break;}
 case 219: 
 var $1348=$x;
 var $1349=$prevline;
 var $1350=(($1349+($1348<<1))|0);
 var $1351=HEAP16[(($1350)>>1)];
 var $1352=($1351&65535);
 var $1353=$mix;
 var $1354=($1353&65535);
 var $1355=$1352^$1354;
 var $1356=(($1355)&65535);
 var $1357=$x;
 var $1358=$line;
 var $1359=(($1358+($1357<<1))|0);
 HEAP16[(($1359)>>1)]=$1356;
 label=221;break;
 case 220: 
 var $1361=$x;
 var $1362=$prevline;
 var $1363=(($1362+($1361<<1))|0);
 var $1364=HEAP16[(($1363)>>1)];
 var $1365=$x;
 var $1366=$line;
 var $1367=(($1366+($1365<<1))|0);
 HEAP16[(($1367)>>1)]=$1364;
 label=221;break;
 case 221: 
 var $1369=$count;
 var $1370=((($1369)-(1))|0);
 $count=$1370;
 var $1371=$x;
 var $1372=((($1371)+(1))|0);
 $x=$1372;
 var $1373=$mixmask;
 var $1374=($1373&255);
 var $1375=$1374<<1;
 var $1376=(($1375)&255);
 $mixmask=$1376;
 var $1377=$mixmask;
 var $1378=($1377&255);
 var $1379=($1378|0)==0;
 if($1379){label=222;break;}else{label=226;break;}
 case 222: 
 var $1381=$fom_mask;
 var $1382=($1381|0)!=0;
 if($1382){label=223;break;}else{label=224;break;}
 case 223: 
 var $1384=$fom_mask;
 var $1391=$1384;label=225;break;
 case 224: 
 var $1386=$5;
 var $1387=(($1386+1)|0);
 $5=$1387;
 var $1388=HEAP8[($1386)];
 var $1389=($1388&255);
 var $1391=$1389;label=225;break;
 case 225: 
 var $1391;
 var $1392=(($1391)&255);
 $mask=$1392;
 $mixmask=1;
 label=226;break;
 case 226: 
 var $1394=$mask;
 var $1395=($1394&255);
 var $1396=$mixmask;
 var $1397=($1396&255);
 var $1398=$1395&$1397;
 var $1399=($1398|0)!=0;
 if($1399){label=227;break;}else{label=228;break;}
 case 227: 
 var $1401=$x;
 var $1402=$prevline;
 var $1403=(($1402+($1401<<1))|0);
 var $1404=HEAP16[(($1403)>>1)];
 var $1405=($1404&65535);
 var $1406=$mix;
 var $1407=($1406&65535);
 var $1408=$1405^$1407;
 var $1409=(($1408)&65535);
 var $1410=$x;
 var $1411=$line;
 var $1412=(($1411+($1410<<1))|0);
 HEAP16[(($1412)>>1)]=$1409;
 label=229;break;
 case 228: 
 var $1414=$x;
 var $1415=$prevline;
 var $1416=(($1415+($1414<<1))|0);
 var $1417=HEAP16[(($1416)>>1)];
 var $1418=$x;
 var $1419=$line;
 var $1420=(($1419+($1418<<1))|0);
 HEAP16[(($1420)>>1)]=$1417;
 label=229;break;
 case 229: 
 var $1422=$count;
 var $1423=((($1422)-(1))|0);
 $count=$1423;
 var $1424=$x;
 var $1425=((($1424)+(1))|0);
 $x=$1425;
 var $1426=$mixmask;
 var $1427=($1426&255);
 var $1428=$1427<<1;
 var $1429=(($1428)&255);
 $mixmask=$1429;
 var $1430=$mixmask;
 var $1431=($1430&255);
 var $1432=($1431|0)==0;
 if($1432){label=230;break;}else{label=234;break;}
 case 230: 
 var $1434=$fom_mask;
 var $1435=($1434|0)!=0;
 if($1435){label=231;break;}else{label=232;break;}
 case 231: 
 var $1437=$fom_mask;
 var $1444=$1437;label=233;break;
 case 232: 
 var $1439=$5;
 var $1440=(($1439+1)|0);
 $5=$1440;
 var $1441=HEAP8[($1439)];
 var $1442=($1441&255);
 var $1444=$1442;label=233;break;
 case 233: 
 var $1444;
 var $1445=(($1444)&255);
 $mask=$1445;
 $mixmask=1;
 label=234;break;
 case 234: 
 var $1447=$mask;
 var $1448=($1447&255);
 var $1449=$mixmask;
 var $1450=($1449&255);
 var $1451=$1448&$1450;
 var $1452=($1451|0)!=0;
 if($1452){label=235;break;}else{label=236;break;}
 case 235: 
 var $1454=$x;
 var $1455=$prevline;
 var $1456=(($1455+($1454<<1))|0);
 var $1457=HEAP16[(($1456)>>1)];
 var $1458=($1457&65535);
 var $1459=$mix;
 var $1460=($1459&65535);
 var $1461=$1458^$1460;
 var $1462=(($1461)&65535);
 var $1463=$x;
 var $1464=$line;
 var $1465=(($1464+($1463<<1))|0);
 HEAP16[(($1465)>>1)]=$1462;
 label=237;break;
 case 236: 
 var $1467=$x;
 var $1468=$prevline;
 var $1469=(($1468+($1467<<1))|0);
 var $1470=HEAP16[(($1469)>>1)];
 var $1471=$x;
 var $1472=$line;
 var $1473=(($1472+($1471<<1))|0);
 HEAP16[(($1473)>>1)]=$1470;
 label=237;break;
 case 237: 
 var $1475=$count;
 var $1476=((($1475)-(1))|0);
 $count=$1476;
 var $1477=$x;
 var $1478=((($1477)+(1))|0);
 $x=$1478;
 var $1479=$mixmask;
 var $1480=($1479&255);
 var $1481=$1480<<1;
 var $1482=(($1481)&255);
 $mixmask=$1482;
 var $1483=$mixmask;
 var $1484=($1483&255);
 var $1485=($1484|0)==0;
 if($1485){label=238;break;}else{label=242;break;}
 case 238: 
 var $1487=$fom_mask;
 var $1488=($1487|0)!=0;
 if($1488){label=239;break;}else{label=240;break;}
 case 239: 
 var $1490=$fom_mask;
 var $1497=$1490;label=241;break;
 case 240: 
 var $1492=$5;
 var $1493=(($1492+1)|0);
 $5=$1493;
 var $1494=HEAP8[($1492)];
 var $1495=($1494&255);
 var $1497=$1495;label=241;break;
 case 241: 
 var $1497;
 var $1498=(($1497)&255);
 $mask=$1498;
 $mixmask=1;
 label=242;break;
 case 242: 
 var $1500=$mask;
 var $1501=($1500&255);
 var $1502=$mixmask;
 var $1503=($1502&255);
 var $1504=$1501&$1503;
 var $1505=($1504|0)!=0;
 if($1505){label=243;break;}else{label=244;break;}
 case 243: 
 var $1507=$x;
 var $1508=$prevline;
 var $1509=(($1508+($1507<<1))|0);
 var $1510=HEAP16[(($1509)>>1)];
 var $1511=($1510&65535);
 var $1512=$mix;
 var $1513=($1512&65535);
 var $1514=$1511^$1513;
 var $1515=(($1514)&65535);
 var $1516=$x;
 var $1517=$line;
 var $1518=(($1517+($1516<<1))|0);
 HEAP16[(($1518)>>1)]=$1515;
 label=245;break;
 case 244: 
 var $1520=$x;
 var $1521=$prevline;
 var $1522=(($1521+($1520<<1))|0);
 var $1523=HEAP16[(($1522)>>1)];
 var $1524=$x;
 var $1525=$line;
 var $1526=(($1525+($1524<<1))|0);
 HEAP16[(($1526)>>1)]=$1523;
 label=245;break;
 case 245: 
 var $1528=$count;
 var $1529=((($1528)-(1))|0);
 $count=$1529;
 var $1530=$x;
 var $1531=((($1530)+(1))|0);
 $x=$1531;
 label=178;break;
 case 246: 
 label=247;break;
 case 247: 
 var $1534=$count;
 var $1535=($1534|0)>0;
 if($1535){label=248;break;}else{var $1541=0;label=249;break;}
 case 248: 
 var $1537=$x;
 var $1538=$3;
 var $1539=($1537|0)<($1538|0);
 var $1541=$1539;label=249;break;
 case 249: 
 var $1541;
 if($1541){label=250;break;}else{label=259;break;}
 case 250: 
 var $1543=$mixmask;
 var $1544=($1543&255);
 var $1545=$1544<<1;
 var $1546=(($1545)&255);
 $mixmask=$1546;
 var $1547=$mixmask;
 var $1548=($1547&255);
 var $1549=($1548|0)==0;
 if($1549){label=251;break;}else{label=255;break;}
 case 251: 
 var $1551=$fom_mask;
 var $1552=($1551|0)!=0;
 if($1552){label=252;break;}else{label=253;break;}
 case 252: 
 var $1554=$fom_mask;
 var $1561=$1554;label=254;break;
 case 253: 
 var $1556=$5;
 var $1557=(($1556+1)|0);
 $5=$1557;
 var $1558=HEAP8[($1556)];
 var $1559=($1558&255);
 var $1561=$1559;label=254;break;
 case 254: 
 var $1561;
 var $1562=(($1561)&255);
 $mask=$1562;
 $mixmask=1;
 label=255;break;
 case 255: 
 var $1564=$mask;
 var $1565=($1564&255);
 var $1566=$mixmask;
 var $1567=($1566&255);
 var $1568=$1565&$1567;
 var $1569=($1568|0)!=0;
 if($1569){label=256;break;}else{label=257;break;}
 case 256: 
 var $1571=$x;
 var $1572=$prevline;
 var $1573=(($1572+($1571<<1))|0);
 var $1574=HEAP16[(($1573)>>1)];
 var $1575=($1574&65535);
 var $1576=$mix;
 var $1577=($1576&65535);
 var $1578=$1575^$1577;
 var $1579=(($1578)&65535);
 var $1580=$x;
 var $1581=$line;
 var $1582=(($1581+($1580<<1))|0);
 HEAP16[(($1582)>>1)]=$1579;
 label=258;break;
 case 257: 
 var $1584=$x;
 var $1585=$prevline;
 var $1586=(($1585+($1584<<1))|0);
 var $1587=HEAP16[(($1586)>>1)];
 var $1588=$x;
 var $1589=$line;
 var $1590=(($1589+($1588<<1))|0);
 HEAP16[(($1590)>>1)]=$1587;
 label=258;break;
 case 258: 
 var $1592=$count;
 var $1593=((($1592)-(1))|0);
 $count=$1593;
 var $1594=$x;
 var $1595=((($1594)+(1))|0);
 $x=$1595;
 label=247;break;
 case 259: 
 label=260;break;
 case 260: 
 label=344;break;
 case 261: 
 label=262;break;
 case 262: 
 var $1600=$count;
 var $1601=$1600&-8;
 var $1602=($1601|0)!=0;
 if($1602){label=263;break;}else{var $1609=0;label=264;break;}
 case 263: 
 var $1604=$x;
 var $1605=((($1604)+(8))|0);
 var $1606=$3;
 var $1607=($1605|0)<($1606|0);
 var $1609=$1607;label=264;break;
 case 264: 
 var $1609;
 if($1609){label=265;break;}else{label=266;break;}
 case 265: 
 var $1611=$colour2;
 var $1612=$x;
 var $1613=$line;
 var $1614=(($1613+($1612<<1))|0);
 HEAP16[(($1614)>>1)]=$1611;
 var $1615=$count;
 var $1616=((($1615)-(1))|0);
 $count=$1616;
 var $1617=$x;
 var $1618=((($1617)+(1))|0);
 $x=$1618;
 var $1619=$colour2;
 var $1620=$x;
 var $1621=$line;
 var $1622=(($1621+($1620<<1))|0);
 HEAP16[(($1622)>>1)]=$1619;
 var $1623=$count;
 var $1624=((($1623)-(1))|0);
 $count=$1624;
 var $1625=$x;
 var $1626=((($1625)+(1))|0);
 $x=$1626;
 var $1627=$colour2;
 var $1628=$x;
 var $1629=$line;
 var $1630=(($1629+($1628<<1))|0);
 HEAP16[(($1630)>>1)]=$1627;
 var $1631=$count;
 var $1632=((($1631)-(1))|0);
 $count=$1632;
 var $1633=$x;
 var $1634=((($1633)+(1))|0);
 $x=$1634;
 var $1635=$colour2;
 var $1636=$x;
 var $1637=$line;
 var $1638=(($1637+($1636<<1))|0);
 HEAP16[(($1638)>>1)]=$1635;
 var $1639=$count;
 var $1640=((($1639)-(1))|0);
 $count=$1640;
 var $1641=$x;
 var $1642=((($1641)+(1))|0);
 $x=$1642;
 var $1643=$colour2;
 var $1644=$x;
 var $1645=$line;
 var $1646=(($1645+($1644<<1))|0);
 HEAP16[(($1646)>>1)]=$1643;
 var $1647=$count;
 var $1648=((($1647)-(1))|0);
 $count=$1648;
 var $1649=$x;
 var $1650=((($1649)+(1))|0);
 $x=$1650;
 var $1651=$colour2;
 var $1652=$x;
 var $1653=$line;
 var $1654=(($1653+($1652<<1))|0);
 HEAP16[(($1654)>>1)]=$1651;
 var $1655=$count;
 var $1656=((($1655)-(1))|0);
 $count=$1656;
 var $1657=$x;
 var $1658=((($1657)+(1))|0);
 $x=$1658;
 var $1659=$colour2;
 var $1660=$x;
 var $1661=$line;
 var $1662=(($1661+($1660<<1))|0);
 HEAP16[(($1662)>>1)]=$1659;
 var $1663=$count;
 var $1664=((($1663)-(1))|0);
 $count=$1664;
 var $1665=$x;
 var $1666=((($1665)+(1))|0);
 $x=$1666;
 var $1667=$colour2;
 var $1668=$x;
 var $1669=$line;
 var $1670=(($1669+($1668<<1))|0);
 HEAP16[(($1670)>>1)]=$1667;
 var $1671=$count;
 var $1672=((($1671)-(1))|0);
 $count=$1672;
 var $1673=$x;
 var $1674=((($1673)+(1))|0);
 $x=$1674;
 label=262;break;
 case 266: 
 label=267;break;
 case 267: 
 var $1677=$count;
 var $1678=($1677|0)>0;
 if($1678){label=268;break;}else{var $1684=0;label=269;break;}
 case 268: 
 var $1680=$x;
 var $1681=$3;
 var $1682=($1680|0)<($1681|0);
 var $1684=$1682;label=269;break;
 case 269: 
 var $1684;
 if($1684){label=270;break;}else{label=271;break;}
 case 270: 
 var $1686=$colour2;
 var $1687=$x;
 var $1688=$line;
 var $1689=(($1688+($1687<<1))|0);
 HEAP16[(($1689)>>1)]=$1686;
 var $1690=$count;
 var $1691=((($1690)-(1))|0);
 $count=$1691;
 var $1692=$x;
 var $1693=((($1692)+(1))|0);
 $x=$1693;
 label=267;break;
 case 271: 
 label=344;break;
 case 272: 
 label=273;break;
 case 273: 
 var $1697=$count;
 var $1698=$1697&-8;
 var $1699=($1698|0)!=0;
 if($1699){label=274;break;}else{var $1706=0;label=275;break;}
 case 274: 
 var $1701=$x;
 var $1702=((($1701)+(8))|0);
 var $1703=$3;
 var $1704=($1702|0)<($1703|0);
 var $1706=$1704;label=275;break;
 case 275: 
 var $1706;
 if($1706){label=276;break;}else{label=277;break;}
 case 276: 
 var $1708=$5;
 var $1709=(($1708+1)|0);
 $5=$1709;
 var $1710=HEAP8[($1708)];
 var $1711=($1710&255);
 var $1712=$x;
 var $1713=$line;
 var $1714=(($1713+($1712<<1))|0);
 HEAP16[(($1714)>>1)]=$1711;
 var $1715=$5;
 var $1716=(($1715+1)|0);
 $5=$1716;
 var $1717=HEAP8[($1715)];
 var $1718=($1717&255);
 var $1719=$1718<<8;
 var $1720=$x;
 var $1721=$line;
 var $1722=(($1721+($1720<<1))|0);
 var $1723=HEAP16[(($1722)>>1)];
 var $1724=($1723&65535);
 var $1725=$1724|$1719;
 var $1726=(($1725)&65535);
 HEAP16[(($1722)>>1)]=$1726;
 var $1727=$count;
 var $1728=((($1727)-(1))|0);
 $count=$1728;
 var $1729=$x;
 var $1730=((($1729)+(1))|0);
 $x=$1730;
 var $1731=$5;
 var $1732=(($1731+1)|0);
 $5=$1732;
 var $1733=HEAP8[($1731)];
 var $1734=($1733&255);
 var $1735=$x;
 var $1736=$line;
 var $1737=(($1736+($1735<<1))|0);
 HEAP16[(($1737)>>1)]=$1734;
 var $1738=$5;
 var $1739=(($1738+1)|0);
 $5=$1739;
 var $1740=HEAP8[($1738)];
 var $1741=($1740&255);
 var $1742=$1741<<8;
 var $1743=$x;
 var $1744=$line;
 var $1745=(($1744+($1743<<1))|0);
 var $1746=HEAP16[(($1745)>>1)];
 var $1747=($1746&65535);
 var $1748=$1747|$1742;
 var $1749=(($1748)&65535);
 HEAP16[(($1745)>>1)]=$1749;
 var $1750=$count;
 var $1751=((($1750)-(1))|0);
 $count=$1751;
 var $1752=$x;
 var $1753=((($1752)+(1))|0);
 $x=$1753;
 var $1754=$5;
 var $1755=(($1754+1)|0);
 $5=$1755;
 var $1756=HEAP8[($1754)];
 var $1757=($1756&255);
 var $1758=$x;
 var $1759=$line;
 var $1760=(($1759+($1758<<1))|0);
 HEAP16[(($1760)>>1)]=$1757;
 var $1761=$5;
 var $1762=(($1761+1)|0);
 $5=$1762;
 var $1763=HEAP8[($1761)];
 var $1764=($1763&255);
 var $1765=$1764<<8;
 var $1766=$x;
 var $1767=$line;
 var $1768=(($1767+($1766<<1))|0);
 var $1769=HEAP16[(($1768)>>1)];
 var $1770=($1769&65535);
 var $1771=$1770|$1765;
 var $1772=(($1771)&65535);
 HEAP16[(($1768)>>1)]=$1772;
 var $1773=$count;
 var $1774=((($1773)-(1))|0);
 $count=$1774;
 var $1775=$x;
 var $1776=((($1775)+(1))|0);
 $x=$1776;
 var $1777=$5;
 var $1778=(($1777+1)|0);
 $5=$1778;
 var $1779=HEAP8[($1777)];
 var $1780=($1779&255);
 var $1781=$x;
 var $1782=$line;
 var $1783=(($1782+($1781<<1))|0);
 HEAP16[(($1783)>>1)]=$1780;
 var $1784=$5;
 var $1785=(($1784+1)|0);
 $5=$1785;
 var $1786=HEAP8[($1784)];
 var $1787=($1786&255);
 var $1788=$1787<<8;
 var $1789=$x;
 var $1790=$line;
 var $1791=(($1790+($1789<<1))|0);
 var $1792=HEAP16[(($1791)>>1)];
 var $1793=($1792&65535);
 var $1794=$1793|$1788;
 var $1795=(($1794)&65535);
 HEAP16[(($1791)>>1)]=$1795;
 var $1796=$count;
 var $1797=((($1796)-(1))|0);
 $count=$1797;
 var $1798=$x;
 var $1799=((($1798)+(1))|0);
 $x=$1799;
 var $1800=$5;
 var $1801=(($1800+1)|0);
 $5=$1801;
 var $1802=HEAP8[($1800)];
 var $1803=($1802&255);
 var $1804=$x;
 var $1805=$line;
 var $1806=(($1805+($1804<<1))|0);
 HEAP16[(($1806)>>1)]=$1803;
 var $1807=$5;
 var $1808=(($1807+1)|0);
 $5=$1808;
 var $1809=HEAP8[($1807)];
 var $1810=($1809&255);
 var $1811=$1810<<8;
 var $1812=$x;
 var $1813=$line;
 var $1814=(($1813+($1812<<1))|0);
 var $1815=HEAP16[(($1814)>>1)];
 var $1816=($1815&65535);
 var $1817=$1816|$1811;
 var $1818=(($1817)&65535);
 HEAP16[(($1814)>>1)]=$1818;
 var $1819=$count;
 var $1820=((($1819)-(1))|0);
 $count=$1820;
 var $1821=$x;
 var $1822=((($1821)+(1))|0);
 $x=$1822;
 var $1823=$5;
 var $1824=(($1823+1)|0);
 $5=$1824;
 var $1825=HEAP8[($1823)];
 var $1826=($1825&255);
 var $1827=$x;
 var $1828=$line;
 var $1829=(($1828+($1827<<1))|0);
 HEAP16[(($1829)>>1)]=$1826;
 var $1830=$5;
 var $1831=(($1830+1)|0);
 $5=$1831;
 var $1832=HEAP8[($1830)];
 var $1833=($1832&255);
 var $1834=$1833<<8;
 var $1835=$x;
 var $1836=$line;
 var $1837=(($1836+($1835<<1))|0);
 var $1838=HEAP16[(($1837)>>1)];
 var $1839=($1838&65535);
 var $1840=$1839|$1834;
 var $1841=(($1840)&65535);
 HEAP16[(($1837)>>1)]=$1841;
 var $1842=$count;
 var $1843=((($1842)-(1))|0);
 $count=$1843;
 var $1844=$x;
 var $1845=((($1844)+(1))|0);
 $x=$1845;
 var $1846=$5;
 var $1847=(($1846+1)|0);
 $5=$1847;
 var $1848=HEAP8[($1846)];
 var $1849=($1848&255);
 var $1850=$x;
 var $1851=$line;
 var $1852=(($1851+($1850<<1))|0);
 HEAP16[(($1852)>>1)]=$1849;
 var $1853=$5;
 var $1854=(($1853+1)|0);
 $5=$1854;
 var $1855=HEAP8[($1853)];
 var $1856=($1855&255);
 var $1857=$1856<<8;
 var $1858=$x;
 var $1859=$line;
 var $1860=(($1859+($1858<<1))|0);
 var $1861=HEAP16[(($1860)>>1)];
 var $1862=($1861&65535);
 var $1863=$1862|$1857;
 var $1864=(($1863)&65535);
 HEAP16[(($1860)>>1)]=$1864;
 var $1865=$count;
 var $1866=((($1865)-(1))|0);
 $count=$1866;
 var $1867=$x;
 var $1868=((($1867)+(1))|0);
 $x=$1868;
 var $1869=$5;
 var $1870=(($1869+1)|0);
 $5=$1870;
 var $1871=HEAP8[($1869)];
 var $1872=($1871&255);
 var $1873=$x;
 var $1874=$line;
 var $1875=(($1874+($1873<<1))|0);
 HEAP16[(($1875)>>1)]=$1872;
 var $1876=$5;
 var $1877=(($1876+1)|0);
 $5=$1877;
 var $1878=HEAP8[($1876)];
 var $1879=($1878&255);
 var $1880=$1879<<8;
 var $1881=$x;
 var $1882=$line;
 var $1883=(($1882+($1881<<1))|0);
 var $1884=HEAP16[(($1883)>>1)];
 var $1885=($1884&65535);
 var $1886=$1885|$1880;
 var $1887=(($1886)&65535);
 HEAP16[(($1883)>>1)]=$1887;
 var $1888=$count;
 var $1889=((($1888)-(1))|0);
 $count=$1889;
 var $1890=$x;
 var $1891=((($1890)+(1))|0);
 $x=$1891;
 label=273;break;
 case 277: 
 label=278;break;
 case 278: 
 var $1894=$count;
 var $1895=($1894|0)>0;
 if($1895){label=279;break;}else{var $1901=0;label=280;break;}
 case 279: 
 var $1897=$x;
 var $1898=$3;
 var $1899=($1897|0)<($1898|0);
 var $1901=$1899;label=280;break;
 case 280: 
 var $1901;
 if($1901){label=281;break;}else{label=282;break;}
 case 281: 
 var $1903=$5;
 var $1904=(($1903+1)|0);
 $5=$1904;
 var $1905=HEAP8[($1903)];
 var $1906=($1905&255);
 var $1907=$x;
 var $1908=$line;
 var $1909=(($1908+($1907<<1))|0);
 HEAP16[(($1909)>>1)]=$1906;
 var $1910=$5;
 var $1911=(($1910+1)|0);
 $5=$1911;
 var $1912=HEAP8[($1910)];
 var $1913=($1912&255);
 var $1914=$1913<<8;
 var $1915=$x;
 var $1916=$line;
 var $1917=(($1916+($1915<<1))|0);
 var $1918=HEAP16[(($1917)>>1)];
 var $1919=($1918&65535);
 var $1920=$1919|$1914;
 var $1921=(($1920)&65535);
 HEAP16[(($1917)>>1)]=$1921;
 var $1922=$count;
 var $1923=((($1922)-(1))|0);
 $count=$1923;
 var $1924=$x;
 var $1925=((($1924)+(1))|0);
 $x=$1925;
 label=278;break;
 case 282: 
 label=344;break;
 case 283: 
 label=284;break;
 case 284: 
 var $1929=$count;
 var $1930=$1929&-8;
 var $1931=($1930|0)!=0;
 if($1931){label=285;break;}else{var $1938=0;label=286;break;}
 case 285: 
 var $1933=$x;
 var $1934=((($1933)+(8))|0);
 var $1935=$3;
 var $1936=($1934|0)<($1935|0);
 var $1938=$1936;label=286;break;
 case 286: 
 var $1938;
 if($1938){label=287;break;}else{label=312;break;}
 case 287: 
 var $1940=$bicolour;
 var $1941=($1940|0)!=0;
 if($1941){label=288;break;}else{label=289;break;}
 case 288: 
 var $1943=$colour2;
 var $1944=$x;
 var $1945=$line;
 var $1946=(($1945+($1944<<1))|0);
 HEAP16[(($1946)>>1)]=$1943;
 $bicolour=0;
 label=290;break;
 case 289: 
 var $1948=$colour1;
 var $1949=$x;
 var $1950=$line;
 var $1951=(($1950+($1949<<1))|0);
 HEAP16[(($1951)>>1)]=$1948;
 $bicolour=1;
 var $1952=$count;
 var $1953=((($1952)+(1))|0);
 $count=$1953;
 label=290;break;
 case 290: 
 var $1955=$count;
 var $1956=((($1955)-(1))|0);
 $count=$1956;
 var $1957=$x;
 var $1958=((($1957)+(1))|0);
 $x=$1958;
 var $1959=$bicolour;
 var $1960=($1959|0)!=0;
 if($1960){label=291;break;}else{label=292;break;}
 case 291: 
 var $1962=$colour2;
 var $1963=$x;
 var $1964=$line;
 var $1965=(($1964+($1963<<1))|0);
 HEAP16[(($1965)>>1)]=$1962;
 $bicolour=0;
 label=293;break;
 case 292: 
 var $1967=$colour1;
 var $1968=$x;
 var $1969=$line;
 var $1970=(($1969+($1968<<1))|0);
 HEAP16[(($1970)>>1)]=$1967;
 $bicolour=1;
 var $1971=$count;
 var $1972=((($1971)+(1))|0);
 $count=$1972;
 label=293;break;
 case 293: 
 var $1974=$count;
 var $1975=((($1974)-(1))|0);
 $count=$1975;
 var $1976=$x;
 var $1977=((($1976)+(1))|0);
 $x=$1977;
 var $1978=$bicolour;
 var $1979=($1978|0)!=0;
 if($1979){label=294;break;}else{label=295;break;}
 case 294: 
 var $1981=$colour2;
 var $1982=$x;
 var $1983=$line;
 var $1984=(($1983+($1982<<1))|0);
 HEAP16[(($1984)>>1)]=$1981;
 $bicolour=0;
 label=296;break;
 case 295: 
 var $1986=$colour1;
 var $1987=$x;
 var $1988=$line;
 var $1989=(($1988+($1987<<1))|0);
 HEAP16[(($1989)>>1)]=$1986;
 $bicolour=1;
 var $1990=$count;
 var $1991=((($1990)+(1))|0);
 $count=$1991;
 label=296;break;
 case 296: 
 var $1993=$count;
 var $1994=((($1993)-(1))|0);
 $count=$1994;
 var $1995=$x;
 var $1996=((($1995)+(1))|0);
 $x=$1996;
 var $1997=$bicolour;
 var $1998=($1997|0)!=0;
 if($1998){label=297;break;}else{label=298;break;}
 case 297: 
 var $2000=$colour2;
 var $2001=$x;
 var $2002=$line;
 var $2003=(($2002+($2001<<1))|0);
 HEAP16[(($2003)>>1)]=$2000;
 $bicolour=0;
 label=299;break;
 case 298: 
 var $2005=$colour1;
 var $2006=$x;
 var $2007=$line;
 var $2008=(($2007+($2006<<1))|0);
 HEAP16[(($2008)>>1)]=$2005;
 $bicolour=1;
 var $2009=$count;
 var $2010=((($2009)+(1))|0);
 $count=$2010;
 label=299;break;
 case 299: 
 var $2012=$count;
 var $2013=((($2012)-(1))|0);
 $count=$2013;
 var $2014=$x;
 var $2015=((($2014)+(1))|0);
 $x=$2015;
 var $2016=$bicolour;
 var $2017=($2016|0)!=0;
 if($2017){label=300;break;}else{label=301;break;}
 case 300: 
 var $2019=$colour2;
 var $2020=$x;
 var $2021=$line;
 var $2022=(($2021+($2020<<1))|0);
 HEAP16[(($2022)>>1)]=$2019;
 $bicolour=0;
 label=302;break;
 case 301: 
 var $2024=$colour1;
 var $2025=$x;
 var $2026=$line;
 var $2027=(($2026+($2025<<1))|0);
 HEAP16[(($2027)>>1)]=$2024;
 $bicolour=1;
 var $2028=$count;
 var $2029=((($2028)+(1))|0);
 $count=$2029;
 label=302;break;
 case 302: 
 var $2031=$count;
 var $2032=((($2031)-(1))|0);
 $count=$2032;
 var $2033=$x;
 var $2034=((($2033)+(1))|0);
 $x=$2034;
 var $2035=$bicolour;
 var $2036=($2035|0)!=0;
 if($2036){label=303;break;}else{label=304;break;}
 case 303: 
 var $2038=$colour2;
 var $2039=$x;
 var $2040=$line;
 var $2041=(($2040+($2039<<1))|0);
 HEAP16[(($2041)>>1)]=$2038;
 $bicolour=0;
 label=305;break;
 case 304: 
 var $2043=$colour1;
 var $2044=$x;
 var $2045=$line;
 var $2046=(($2045+($2044<<1))|0);
 HEAP16[(($2046)>>1)]=$2043;
 $bicolour=1;
 var $2047=$count;
 var $2048=((($2047)+(1))|0);
 $count=$2048;
 label=305;break;
 case 305: 
 var $2050=$count;
 var $2051=((($2050)-(1))|0);
 $count=$2051;
 var $2052=$x;
 var $2053=((($2052)+(1))|0);
 $x=$2053;
 var $2054=$bicolour;
 var $2055=($2054|0)!=0;
 if($2055){label=306;break;}else{label=307;break;}
 case 306: 
 var $2057=$colour2;
 var $2058=$x;
 var $2059=$line;
 var $2060=(($2059+($2058<<1))|0);
 HEAP16[(($2060)>>1)]=$2057;
 $bicolour=0;
 label=308;break;
 case 307: 
 var $2062=$colour1;
 var $2063=$x;
 var $2064=$line;
 var $2065=(($2064+($2063<<1))|0);
 HEAP16[(($2065)>>1)]=$2062;
 $bicolour=1;
 var $2066=$count;
 var $2067=((($2066)+(1))|0);
 $count=$2067;
 label=308;break;
 case 308: 
 var $2069=$count;
 var $2070=((($2069)-(1))|0);
 $count=$2070;
 var $2071=$x;
 var $2072=((($2071)+(1))|0);
 $x=$2072;
 var $2073=$bicolour;
 var $2074=($2073|0)!=0;
 if($2074){label=309;break;}else{label=310;break;}
 case 309: 
 var $2076=$colour2;
 var $2077=$x;
 var $2078=$line;
 var $2079=(($2078+($2077<<1))|0);
 HEAP16[(($2079)>>1)]=$2076;
 $bicolour=0;
 label=311;break;
 case 310: 
 var $2081=$colour1;
 var $2082=$x;
 var $2083=$line;
 var $2084=(($2083+($2082<<1))|0);
 HEAP16[(($2084)>>1)]=$2081;
 $bicolour=1;
 var $2085=$count;
 var $2086=((($2085)+(1))|0);
 $count=$2086;
 label=311;break;
 case 311: 
 var $2088=$count;
 var $2089=((($2088)-(1))|0);
 $count=$2089;
 var $2090=$x;
 var $2091=((($2090)+(1))|0);
 $x=$2091;
 label=284;break;
 case 312: 
 label=313;break;
 case 313: 
 var $2094=$count;
 var $2095=($2094|0)>0;
 if($2095){label=314;break;}else{var $2101=0;label=315;break;}
 case 314: 
 var $2097=$x;
 var $2098=$3;
 var $2099=($2097|0)<($2098|0);
 var $2101=$2099;label=315;break;
 case 315: 
 var $2101;
 if($2101){label=316;break;}else{label=320;break;}
 case 316: 
 var $2103=$bicolour;
 var $2104=($2103|0)!=0;
 if($2104){label=317;break;}else{label=318;break;}
 case 317: 
 var $2106=$colour2;
 var $2107=$x;
 var $2108=$line;
 var $2109=(($2108+($2107<<1))|0);
 HEAP16[(($2109)>>1)]=$2106;
 $bicolour=0;
 label=319;break;
 case 318: 
 var $2111=$colour1;
 var $2112=$x;
 var $2113=$line;
 var $2114=(($2113+($2112<<1))|0);
 HEAP16[(($2114)>>1)]=$2111;
 $bicolour=1;
 var $2115=$count;
 var $2116=((($2115)+(1))|0);
 $count=$2116;
 label=319;break;
 case 319: 
 var $2118=$count;
 var $2119=((($2118)-(1))|0);
 $count=$2119;
 var $2120=$x;
 var $2121=((($2120)+(1))|0);
 $x=$2121;
 label=313;break;
 case 320: 
 label=344;break;
 case 321: 
 label=322;break;
 case 322: 
 var $2125=$count;
 var $2126=$2125&-8;
 var $2127=($2126|0)!=0;
 if($2127){label=323;break;}else{var $2134=0;label=324;break;}
 case 323: 
 var $2129=$x;
 var $2130=((($2129)+(8))|0);
 var $2131=$3;
 var $2132=($2130|0)<($2131|0);
 var $2134=$2132;label=324;break;
 case 324: 
 var $2134;
 if($2134){label=325;break;}else{label=326;break;}
 case 325: 
 var $2136=$x;
 var $2137=$line;
 var $2138=(($2137+($2136<<1))|0);
 HEAP16[(($2138)>>1)]=-1;
 var $2139=$count;
 var $2140=((($2139)-(1))|0);
 $count=$2140;
 var $2141=$x;
 var $2142=((($2141)+(1))|0);
 $x=$2142;
 var $2143=$x;
 var $2144=$line;
 var $2145=(($2144+($2143<<1))|0);
 HEAP16[(($2145)>>1)]=-1;
 var $2146=$count;
 var $2147=((($2146)-(1))|0);
 $count=$2147;
 var $2148=$x;
 var $2149=((($2148)+(1))|0);
 $x=$2149;
 var $2150=$x;
 var $2151=$line;
 var $2152=(($2151+($2150<<1))|0);
 HEAP16[(($2152)>>1)]=-1;
 var $2153=$count;
 var $2154=((($2153)-(1))|0);
 $count=$2154;
 var $2155=$x;
 var $2156=((($2155)+(1))|0);
 $x=$2156;
 var $2157=$x;
 var $2158=$line;
 var $2159=(($2158+($2157<<1))|0);
 HEAP16[(($2159)>>1)]=-1;
 var $2160=$count;
 var $2161=((($2160)-(1))|0);
 $count=$2161;
 var $2162=$x;
 var $2163=((($2162)+(1))|0);
 $x=$2163;
 var $2164=$x;
 var $2165=$line;
 var $2166=(($2165+($2164<<1))|0);
 HEAP16[(($2166)>>1)]=-1;
 var $2167=$count;
 var $2168=((($2167)-(1))|0);
 $count=$2168;
 var $2169=$x;
 var $2170=((($2169)+(1))|0);
 $x=$2170;
 var $2171=$x;
 var $2172=$line;
 var $2173=(($2172+($2171<<1))|0);
 HEAP16[(($2173)>>1)]=-1;
 var $2174=$count;
 var $2175=((($2174)-(1))|0);
 $count=$2175;
 var $2176=$x;
 var $2177=((($2176)+(1))|0);
 $x=$2177;
 var $2178=$x;
 var $2179=$line;
 var $2180=(($2179+($2178<<1))|0);
 HEAP16[(($2180)>>1)]=-1;
 var $2181=$count;
 var $2182=((($2181)-(1))|0);
 $count=$2182;
 var $2183=$x;
 var $2184=((($2183)+(1))|0);
 $x=$2184;
 var $2185=$x;
 var $2186=$line;
 var $2187=(($2186+($2185<<1))|0);
 HEAP16[(($2187)>>1)]=-1;
 var $2188=$count;
 var $2189=((($2188)-(1))|0);
 $count=$2189;
 var $2190=$x;
 var $2191=((($2190)+(1))|0);
 $x=$2191;
 label=322;break;
 case 326: 
 label=327;break;
 case 327: 
 var $2194=$count;
 var $2195=($2194|0)>0;
 if($2195){label=328;break;}else{var $2201=0;label=329;break;}
 case 328: 
 var $2197=$x;
 var $2198=$3;
 var $2199=($2197|0)<($2198|0);
 var $2201=$2199;label=329;break;
 case 329: 
 var $2201;
 if($2201){label=330;break;}else{label=331;break;}
 case 330: 
 var $2203=$x;
 var $2204=$line;
 var $2205=(($2204+($2203<<1))|0);
 HEAP16[(($2205)>>1)]=-1;
 var $2206=$count;
 var $2207=((($2206)-(1))|0);
 $count=$2207;
 var $2208=$x;
 var $2209=((($2208)+(1))|0);
 $x=$2209;
 label=327;break;
 case 331: 
 label=344;break;
 case 332: 
 label=333;break;
 case 333: 
 var $2213=$count;
 var $2214=$2213&-8;
 var $2215=($2214|0)!=0;
 if($2215){label=334;break;}else{var $2222=0;label=335;break;}
 case 334: 
 var $2217=$x;
 var $2218=((($2217)+(8))|0);
 var $2219=$3;
 var $2220=($2218|0)<($2219|0);
 var $2222=$2220;label=335;break;
 case 335: 
 var $2222;
 if($2222){label=336;break;}else{label=337;break;}
 case 336: 
 var $2224=$x;
 var $2225=$line;
 var $2226=(($2225+($2224<<1))|0);
 HEAP16[(($2226)>>1)]=0;
 var $2227=$count;
 var $2228=((($2227)-(1))|0);
 $count=$2228;
 var $2229=$x;
 var $2230=((($2229)+(1))|0);
 $x=$2230;
 var $2231=$x;
 var $2232=$line;
 var $2233=(($2232+($2231<<1))|0);
 HEAP16[(($2233)>>1)]=0;
 var $2234=$count;
 var $2235=((($2234)-(1))|0);
 $count=$2235;
 var $2236=$x;
 var $2237=((($2236)+(1))|0);
 $x=$2237;
 var $2238=$x;
 var $2239=$line;
 var $2240=(($2239+($2238<<1))|0);
 HEAP16[(($2240)>>1)]=0;
 var $2241=$count;
 var $2242=((($2241)-(1))|0);
 $count=$2242;
 var $2243=$x;
 var $2244=((($2243)+(1))|0);
 $x=$2244;
 var $2245=$x;
 var $2246=$line;
 var $2247=(($2246+($2245<<1))|0);
 HEAP16[(($2247)>>1)]=0;
 var $2248=$count;
 var $2249=((($2248)-(1))|0);
 $count=$2249;
 var $2250=$x;
 var $2251=((($2250)+(1))|0);
 $x=$2251;
 var $2252=$x;
 var $2253=$line;
 var $2254=(($2253+($2252<<1))|0);
 HEAP16[(($2254)>>1)]=0;
 var $2255=$count;
 var $2256=((($2255)-(1))|0);
 $count=$2256;
 var $2257=$x;
 var $2258=((($2257)+(1))|0);
 $x=$2258;
 var $2259=$x;
 var $2260=$line;
 var $2261=(($2260+($2259<<1))|0);
 HEAP16[(($2261)>>1)]=0;
 var $2262=$count;
 var $2263=((($2262)-(1))|0);
 $count=$2263;
 var $2264=$x;
 var $2265=((($2264)+(1))|0);
 $x=$2265;
 var $2266=$x;
 var $2267=$line;
 var $2268=(($2267+($2266<<1))|0);
 HEAP16[(($2268)>>1)]=0;
 var $2269=$count;
 var $2270=((($2269)-(1))|0);
 $count=$2270;
 var $2271=$x;
 var $2272=((($2271)+(1))|0);
 $x=$2272;
 var $2273=$x;
 var $2274=$line;
 var $2275=(($2274+($2273<<1))|0);
 HEAP16[(($2275)>>1)]=0;
 var $2276=$count;
 var $2277=((($2276)-(1))|0);
 $count=$2277;
 var $2278=$x;
 var $2279=((($2278)+(1))|0);
 $x=$2279;
 label=333;break;
 case 337: 
 label=338;break;
 case 338: 
 var $2282=$count;
 var $2283=($2282|0)>0;
 if($2283){label=339;break;}else{var $2289=0;label=340;break;}
 case 339: 
 var $2285=$x;
 var $2286=$3;
 var $2287=($2285|0)<($2286|0);
 var $2289=$2287;label=340;break;
 case 340: 
 var $2289;
 if($2289){label=341;break;}else{label=342;break;}
 case 341: 
 var $2291=$x;
 var $2292=$line;
 var $2293=(($2292+($2291<<1))|0);
 HEAP16[(($2293)>>1)]=0;
 var $2294=$count;
 var $2295=((($2294)-(1))|0);
 $count=$2295;
 var $2296=$x;
 var $2297=((($2296)+(1))|0);
 $x=$2297;
 label=338;break;
 case 342: 
 label=344;break;
 case 343: 
 $1=0;
 label=347;break;
 case 344: 
 label=34;break;
 case 345: 
 label=2;break;
 case 346: 
 $1=1;
 label=347;break;
 case 347: 
 var $2304=$1;
 STACKTOP=sp;return $2304;
  default: assert(0, "bad label: " + label);
 }

}