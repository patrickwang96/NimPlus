var xLeft = [];
var leftIsExist = [];
var leftAmount = 3;
var xMiddle = [];
var middleIsExist = [];
var middleAmount = 5;
var xRight = [];
var rightIsExist = [];
var rightAmount = 7;
var chooseColor = -1;
var y;
var d = 40;

function setup()
{
  createCanvas(1000, 500);
  y = height/2 + 20;
  for (var i = 0; i < 3; i++) {
    xLeft[i] = 50 + i * 50;
    leftIsExist[i] = 1;
  }
  for (var i = 0; i < 5; i++) {
    xMiddle[i] = 275 + i * 50;
    middleIsExist[i] = 1;
  }
  for (var i = 0; i < 7; i++) {
    xRight[i] = 600 + i * 50;
    rightIsExist[i] = 1;
  }
}

function draw()
{
  background(200, 65);

  fill(255, 100, 100);
  for (var i = 0; i < 3; i++) {
    if (leftIsExist[i] == 1) rect(xLeft[i], y, d, d);
  }
  fill(100, 255, 100);
  for (var i = 0; i < 5; i++) {
    if (middleIsExist[i] == 1) rect(xMiddle[i], y, d, d);
  }
  fill(100, 100, 255);
  for (var i = 0; i < 7; i++) {
    if (rightIsExist[i] == 1) rect(xRight[i], y, d, d);
  }
  fill(255, 200, 80);
  rect(width-130, height-80, 120, 70);
  fill(0);
  textSize(24);
  textStyle(BOLD);
  text("End turn", width-120, height - 40);
  textSize(40);
  text("Nim PLUS", 50, 80);
  textSize(18);
  text("NIM is a mathematical game. ", 50, 130);
  text("Two players take turns removing certain number of objects from just one pile. ", 50, 150);
  text("A pile must have at least the same number of token as the pile on its left. ", 50, 170);
  text("The winning rules of this game is being the one who remove the last token.", 50, 190);
}

function mousePressed() {

  for (var i = 0; i < 3; i++) {
    if (leftIsExist[i] == 1 && (chooseColor == -1 || chooseColor == 0) && mouseX >= xLeft[i] && mouseX <= (xLeft[i] + d) && mouseY >= y && mouseY <= (y + d)) {
      leftIsExist[i] = 0;
      leftAmount--;
      chooseColor = 0;
    }
  }

  for (var i = 0; i < 5; i++) {
    if (middleIsExist[i] == 1 && leftAmount < middleAmount && (chooseColor == -1 || chooseColor == 1) &&mouseX >= xMiddle[i] && mouseX <= (xMiddle[i] + d) && mouseY >= y && mouseY <= (y + d)) {
      middleIsExist[i] = 0;
      middleAmount--;
      chooseColor = 1;
    }
  }

  for (var i = 0; i < 7; i++) {
    if (rightIsExist[i] == 1 && middleAmount < rightAmount && (chooseColor == -1 || chooseColor == 2) && mouseX >= xRight[i] && mouseX <= (xRight[i] + d) && mouseY >= y && mouseY <= (y + d)) {
      rightIsExist[i] = 0;
      rightAmount--;
      chooseColor = 2;
    }
  }

  if (mouseX >= width-130 && mouseY >= height-80 && mouseX <= width - 10 && mouseY <= height-10) {
    if (chooseColor == -1) {
      alert("Please remove at least one token before end your turn!");
    } else {
      chooseColor = -1;
      if (leftAmount == 0 && middleAmount == 0 && rightAmount == 0) {
        alert("Congratulations! You win! Press F5 to play again!");
      } else {
        computer(leftAmount, middleAmount, rightAmount);
      }
    }
  }
}

function computer (l, m, r) {
  var chooseGroup;
  var deductNum;
  // 在此添加內容， l, m, r分別是現有的三堆方塊的數量
  // 需要算出來兩個變量 chooseGroup 0為坐1為中2為右
  // deductNum是需要 去除 的方塊數量
  var piles = new Array(l,m,r);

  //alert("current:" + l + " " + m + " " + r);
  var result = play(piles);
  chooseGroup = result[0];
  deductNum = result[1];
  //alert("move " + chooseGroup+ " " + deductNum);

  if (chooseGroup == 0) {
    leftAmount -= deductNum;
    for (var i = 0; i < 3; i++) {
      if (leftIsExist[i] == 1 && deductNum > 0) {
        leftIsExist[i] = 0;
        deductNum--;
      }
    }
  } else if (chooseGroup == 1) {
    middleAmount -= deductNum;
    for (var i = 0; i < 5; i++) {
      if (middleIsExist[i] == 1 && deductNum > 0) {
        middleIsExist[i] = 0;
        deductNum--;
      }
    }
  } else if (chooseGroup == 2) {
    rightAmount -= deductNum;
    for (var i = 0; i < 7; i++) {
      if (rightIsExist[i] == 1 && deductNum > 0) {
        rightIsExist[i] = 0;
        deductNum--;
      }
    }
  }
  if (leftAmount == 0 && middleAmount == 0 && rightAmount == 0) {
    alert("Computer wins! Press F5 to play again!");
  }
}
