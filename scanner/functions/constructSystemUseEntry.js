function constructSystemUseEntry(bigData, i) {
	    var data = bigData.slice(i);
	    var sue = new SystemUseEntry(data);
	    switch (sue.signatureWord()) {
	        case 17221 /* CE */:
	            return new CEEntry(data);
	        case 20548 /* PD */:
	            return new PDEntry(data);
	        case 21328 /* SP */:
	            return new SPEntry(data);
	        case 21332 /* ST */:
	            return new STEntry(data);
	        case 17746 /* ER */:
	            return new EREntry(data);
	        case 17747 /* ES */:
	            return new ESEntry(data);
	        case 20568 /* PX */:
	            return new PXEntry(data);
	        case 20558 /* PN */:
	            return new PNEntry(data);
	        case 21324 /* SL */:
	            return new SLEntry(data);
	        case 20045 /* NM */:
	            return new NMEntry(data);
	        case 17228 /* CL */:
	            return new CLEntry(data);
	        case 20556 /* PL */:
	            return new PLEntry(data);
	        case 21061 /* RE */:
	            return new REEntry(data);
	        case 21574 /* TF */:
	            return new TFEntry(data);
	        case 21318 /* SF */:
	            return new SFEntry(data);
	        case 21074 /* RR */:
	            return new RREntry(data);
	        default:
	            return sue;
	    }
	}