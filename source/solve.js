function play(piles){
  // piles = new Array(2,2,4);
  if(piles.length % 2 == 1){
    piles.push(0);
    piles.sort();
  }

  var difference = new Array();
  for(var i = 0; i< piles.length; i+=2){
    difference.push(piles[i+1] - piles[i]);
  }

  var nimSum = 0;

  for(var i = 0; i < difference.length; i++){
    nimSum ^= difference[i];
  }

  if (nimSum == 0) {
    for(var i = 0; i < piles.length; i++){
      if(piles[i] > 0){
        chooseGroup = i-1;
        deductNum = 1;
        break;
      }
    }
  }
  else{
    //the winning strategy!
    var eachNimSum;
    for(var i = 0; i < difference.length; i++){
      eachNimSum = nimSum ^ difference[i];
      if(eachNimSum < difference[i]){
        chooseGroup = i*2;
        deductNum = difference[i] - eachNimSum;
        break;
      }
    }
  }
  return new Array(chooseGroup,deductNum);
}
