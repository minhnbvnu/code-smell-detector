function myTanh(x){
    return (x>50) ? 1 : (x<-50) ? -1 : (Math.exp(2*x)-1)/(Math.exp(2*x)+1);
}