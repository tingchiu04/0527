# 0527

# 第二個作業-411703517邱婷

#### 與上一步內容無改動的會省略(js檔/html檔等)

---

## 我自己的圖案（連點）

### 外星生物
```javascript=
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];
```

### 貓
```javascript=
let points2 = [[0,10],[2,10],[3,12],[4,10],[4,4],[6,4],[6,2],[8,2],[8,0],[10,0],[10,-2],[12,-2],[12,-10],[10,-12],[-5,-12],[-11,-7],[-11,-5],[-9,-5],[-5,-10],[-2,-10],[-2,-8],[0,-8],[0,-2],[-2,-2],[-2,4],[-4,4],[-4,10],[-3,12],[-2,10],[0,10],[2,10],[3,12]];
```

---

## 用class設定，並增加一個檔案來畫外星生物
會隨機出現顏色、大小不一樣的外星生物在不同位置

### 執行後的圖片
![](https://hackmd.io/_uploads/HksB3BRSh.png)
### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];


var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<1;i=i+1){
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
}

function draw() {
  background(0);

  //Et的繪圖內容
  for(var j=0;j<ets.length;j=j+1){
    et = ets[j]
    et.draw()
  }
}

```

#### et.js
```javascript=
//顏色設定
var et_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a) //本體
var et_colors2 = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a) //框線

//宣告一個類別Et，針對一個畫的圖案
class Et{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = random(5,10) //描述為該物件的放大倍率
      this.color = random(et_colors) //充滿顏色
      this.stroke = random(et_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points.length;k=k+1){
              curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
  }
```

#### index.html
```javascript=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sketch</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
    <script src="et.js"></script>
  </body>
</html>
```


---

## 讓外星生物隨機移動

### 執行後的圖片
![](https://hackmd.io/_uploads/BJLg3Xk8n.gif)

### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];


var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //外星生物的顯示(et)
  for(var i=0;i<1;i=i+1){
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
}

function draw() {
  background(0);

  //Et的繪圖內容
  for(var j=0;j<ets.length;j=j+1){
    et = ets[j]
    et.draw()
    et.update()
  }
}

```

#### et.js
```javascript=
//顏色設定
var et_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a) //本體
var et_colors2 = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a) //框線

//宣告一個類別Et，針對一個畫的圖案
class Et{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = random(5,10) //描述為該物件的放大倍率
      this.color = random(et_colors) //充滿顏色
      this.stroke = random(et_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points.length;k=k+1){
              curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*2 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*2 //現在的位置(y)加上現在的速度(y)
      }
  }
```


---

## 產生多個不同大小、顏色、會移動的外星生物

### 執行後的圖片
![](https://hackmd.io/_uploads/rkfTn7J83.gif)


### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];


var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
}

function draw() {
  background(0);

  //外星生物的顯示(et)
  for(var j=0;j<ets.length;j=j+1){
    et = ets[j]
    et.draw()
    et.update()
  }
}
```

#### et.js
```javascript=
//顏色設定
var et_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a) //本體
var et_colors2 = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a) //框線

//宣告一個類別Et，針對一個畫的圖案
class Et{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = random(5,10) //描述為該物件的放大倍率
      this.color = random(et_colors) //充滿顏色
      this.stroke = random(et_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points.length;k=k+1){
              curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*2 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*2 //現在的位置(y)加上現在的速度(y)
      }
  }
```

---

## 外星生物碰到外框會反彈

### 執行後的圖片
![](https://hackmd.io/_uploads/Bk2n6XyLh.gif)

### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];


var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
}

function draw() {
  background(0);

  //外星生物的顯示(et)
  for(var j=0;j<ets.length;j=j+1){
    et = ets[j]
    et.draw()
    et.update()
  }
}
```

#### et.js
```javascript=
//顏色設定
var et_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a) //本體
var et_colors2 = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a) //框線

//宣告一個類別Et，針對一個畫的圖案
class Et{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = random(5,10) //描述為該物件的放大倍率
      this.color = random(et_colors) //充滿顏色
      this.stroke = random(et_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points.length;k=k+1){
              curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*2 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*2 //現在的位置(y)加上現在的速度(y)
      }
        if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
        this.v.x = -this.v.x //把x軸的速度方向改變
        }
        if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
        this.v.y = -this.v.y //把y軸的速度方向改變
    }
  }
```

---

## 設立弓箭，弓箭會發射飛鏢

### 執行後的圖片
![](https://hackmd.io/_uploads/ByZQ0Qk8h.gif)


### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  
}

function draw() {
  background(0);

  //外星生物的顯示(et)
  for(var j=0;j<ets.length;j=j+1){
    et = ets[j]
    et.draw()
    et.update()
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }


  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(width/2,height/2)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
}
```

#### bullet.js
```javascript=
 var bullet_colors = "355070-6d597a-b56576-e56b6f-eaac8".split("-").map(a=>"#"+a)


//定義一個飛鏢(bullet)物件的class

class Bullet{
    constructor(args){
        this.r = args.r || 10 //設計飛鏢有大有小時，就傳參數args.r來設定飛鏢大小，沒有傳參數就以10為準
        this.p = args.p || createVector(width/2,height/2) //建立一個向量
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.color = args.color || random(bullet_colors)
  
    }
    draw(){ //畫出物件程式碼
        push()
          translate(this.p.x,this.p.y)
          let dx = mouseX - width/2 //算出滑鼠與中心點的距離
          let dy = mouseY - height/2 //算出滑鼠與中心點的距離
          let angle = atan2(dy,dx)
          rotate(angle)
          fill(this.color)
          noStroke()
          triangle(this.r/2,this.r/4,-this.r/2,this.r/4,0,this.r*2)
          triangle(this.r/4,this.r/2,this.r/4,-this.r/2,this.r*2,0)
          triangle(this.r/2,-this.r/4,-this.r/2,-this.r/4,0,-this.r*2)
          triangle(-this.r/4,this.r/2,-this.r/4,-this.r/2,-this.r*2,0)
          fill(0)
          line(0,0,0,this.r*2)
          line(0,0,0,-this.r*2)
          line(0,0,this.r*2,0)
          line(0,0,-this.r*2,0)
          fill(220)
          ellipse(0,0,this.r/2)
          fill(255)
          ellipse(0,0,this.r/3)
          pop()
  
    }
    update(){ //計算出移動後的位置
        this.p.add(this.v)
    }
  }
```

#### index.html
```javascript=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sketch</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
    <script src="et.js"></script>
    <script src="bullet.js"></script>   
  </body>
</html>

```

---

## 畫出怪物，會隨機出現顏色大小不一的怪物

### 執行後的圖片
![](https://hackmd.io/_uploads/Hyz9R7yLh.gif)


### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  
}

function draw() {
  background(0);

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    monster.draw()
    monster.update()
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(width/2,height/2)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
}
```

#### monster.js
```javascript=
var monster_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)

var eyes_colors = "2f4858-33658a-86bbd8-f6ae2d-f26419".split("-").map(a=>"#"+a)


class Monster{ //宣告一個怪物類別，名稱為Monster
    constructor(args){
        this.r = args.r || random(50,100) //設計怪物的主體，就傳參數args.r來設定怪物大小，沒有傳參數就以10為準
        this.p = args.p || createVector(random(0+this.r,width-this.r),random(0+this.r,height-this.r)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數，就會利用亂數(-1,1)
        this.color = args.color || random(monster_colors)
        this.eyescolor = args.eyescolor || random(eyes_colors)
        this.mode = random(["happy","bad"])
    }
    draw(){ //畫出元件
        push()
          translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
          fill(this.color)
          noStroke()
          push()
            angleMode(DEGREES)
            rotate(35)
            ellipse(this.r/4,0,this.r,this.r/5*7)
            rotate(290)
            ellipse(-this.r/4,0,this.r,this.r/5*7)
          pop()
          if(this.mode=="happy"){
            fill(255)
            ellipse(-this.r/3,0,this.r/2)
            ellipse(this.r/3,0,this.r/2)
            fill(this.eyescolor)
            ellipse(-this.r/3,0,this.r/3)
            ellipse(this.r/3,0,this.r/3)
            fill(255)
            ellipse(-this.r/3,0,this.r/8)
            ellipse(this.r/3,0,this.r/8)
          }
          else{
            fill(0)
            arc(-this.r/3,0,this.r/2,this.r/2,0,180)
            arc(this.r/3,0,this.r/2,this.r/2,0,180)
            fill(this.eyescolor)
            arc(-this.r/3,0,this.r/3,this.r/3,0,180)
            arc(this.r/3,0,this.r/3,this.r/3,0,180)
            fill(255)
            arc(-this.r/3,0,this.r/8,this.r/8,0,180)
            arc(this.r/3,0,this.r/8,this.r/8,0,180)
          }
          stroke(this.color)
          strokeWeight(4)
          noFill()
        //   line(this.r/2,0,this.r,0)
          angleMode(RADIANS)
          for(var j=0;j<9;j++){
            rotate(PI/10)
            beginShape()
            for(var i=0;i<(this.r/3);i++){
                vertex(this.r/1.5+i,sin(i/5+frameCount/10)*10)
            }

            endShape()
          }
          

        pop() //恢復原點到整個視窗左上早

    }

    update(){//計算出移動元件後的位置
        this.p.add(this.v)

        if(this.p.x<=0+this.r || this.p.x>=width-this.r){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0+this.r/2 || this.p.y>=height-this.r){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
        }

    }
```

#### index.html
```javascript=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sketch</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
    <script src="et.js"></script>
    <script src="bullet.js"></script>   
    <script src="monster.js"></script> 
  </body>
</html>

```

---
## 被飛鏢打中的怪物會出現死亡畫面後消失

### 執行後的圖片
![](https://hackmd.io/_uploads/B1EkJ4y8h.gif)


### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此


function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  
}

function draw() {
  background(0);

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(et.isEtInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的et
        ets.splice(ets.indexOf(et),1) //從倉庫ets裡取出被滑鼠按到的物件編號(ets.indexOf(et),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)         
      }
    }
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的ball
        bullets.splice(bullets.indexOf(bullet),1)      
        monster.dead = true   
      }
    }
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(width/2,height/2)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
}
```

#### et.js
```javascript=
//顏色設定
var et_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a) //本體
var et_colors2 = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a) //框線

//宣告一個類別Et，針對一個畫的圖案
class Et{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = random(5,10) //描述為該物件的放大倍率
      this.color = random(et_colors) //充滿顏色
      this.stroke = random(et_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points.length;k=k+1){
              curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*2 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*2 //現在的位置(y)加上現在的速度(y)
        if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
      }

    isEtInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<12*this.size){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
        return true //傳回true的值
      }
      else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
        return false //傳回false值
      }
    }
}

  
```

#### bullet.js
```javascript=
 var bullet_colors = "355070-6d597a-b56576-e56b6f-eaac8".split("-").map(a=>"#"+a)


//定義一個飛鏢(bullet)物件的class

class Bullet{
    constructor(args){
        this.r = args.r || 10 //設計飛鏢有大有小時，就傳參數args.r來設定飛鏢大小，沒有傳參數就以10為準
        this.p = args.p || createVector(width/2,height/2) //建立一個向量
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.color = args.color || random(bullet_colors)
  
    }
    draw(){ //畫出物件程式碼
        push()
          translate(this.p.x,this.p.y)
          let dx = mouseX - width/2 //算出滑鼠與中心點的距離
          let dy = mouseY - height/2 //算出滑鼠與中心點的距離
          let angle = atan2(dy,dx)
          rotate(angle)
          fill(this.color)
          noStroke()
          triangle(this.r/2,this.r/4,-this.r/2,this.r/4,0,this.r*2)
          triangle(this.r/4,this.r/2,this.r/4,-this.r/2,this.r*2,0)
          triangle(this.r/2,-this.r/4,-this.r/2,-this.r/4,0,-this.r*2)
          triangle(-this.r/4,this.r/2,-this.r/4,-this.r/2,-this.r*2,0)
          fill(0)
          line(0,0,0,this.r*2)
          line(0,0,0,-this.r*2)
          line(0,0,this.r*2,0)
          line(0,0,-this.r*2,0)
          fill(220)
          ellipse(0,0,this.r/2)
          fill(255)
          ellipse(0,0,this.r/3)
          pop()
  
    }
    update(){ //計算出移動後的位置
        this.p.add(this.v)
    }
  }
```


#### monster.js
```javascript=
var monster_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)

var eyes_colors = "2f4858-33658a-86bbd8-f6ae2d-f26419".split("-").map(a=>"#"+a)


class Monster{ //宣告一個怪物類別，名稱為Monster
    constructor(args){
        this.r = args.r || random(50,100) //設計怪物的主體，就傳參數args.r來設定怪物大小，沒有傳參數就以10為準
        this.p = args.p || createVector(random(0+this.r,width-this.r),random(0+this.r,height-this.r)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數，就會利用亂數(-1,1)
        this.color = args.color || random(monster_colors)
        this.eyescolor = args.eyescolor || random(eyes_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //活著
        this.timenum = 0 //延長時間
    }
    draw(){ //畫出元件
        if(this.dead == false){
        push()
          translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
          fill(this.color)
          noStroke()
          push()
            angleMode(DEGREES)
            rotate(35)
            ellipse(this.r/4,0,this.r,this.r/5*7)
            rotate(290)
            ellipse(-this.r/4,0,this.r,this.r/5*7)
          pop()
          if(this.mode=="happy"){
            fill(255)
            ellipse(-this.r/3,0,this.r/2)
            ellipse(this.r/3,0,this.r/2)
            fill(this.eyescolor)
            ellipse(-this.r/3,0,this.r/3)
            ellipse(this.r/3,0,this.r/3)
            fill(255)
            ellipse(-this.r/3,0,this.r/8)
            ellipse(this.r/3,0,this.r/8)
          }
          else{
            fill(0)
            arc(-this.r/3,0,this.r/2,this.r/2,0,180)
            arc(this.r/3,0,this.r/2,this.r/2,0,180)
            fill(this.eyescolor)
            arc(-this.r/3,0,this.r/3,this.r/3,0,180)
            arc(this.r/3,0,this.r/3,this.r/3,0,180)
            fill(255)
            arc(-this.r/3,0,this.r/8,this.r/8,0,180)
            arc(this.r/3,0,this.r/8,this.r/8,0,180)
          }
          stroke(this.color)
          strokeWeight(4)
          noFill()
          angleMode(RADIANS)
          for(var j=0;j<9;j++){
            rotate(PI/10)
            beginShape()
            for(var i=0;i<(this.r/3);i++){
                vertex(this.r/1.5+i,sin(i/5+frameCount/10)*10)
            }

            endShape()
          }

        pop() //恢復原點到整個視窗左上
        }
        else{ //怪物死亡畫面
            this.timenum = this.timenum+1
            push()
              translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
              fill(this.color)
              noStroke()
              push()
                angleMode(DEGREES)
                rotate(35)
                ellipse(this.r/4,0,this.r,this.r/5*7)
                rotate(290)
                ellipse(-this.r/4,0,this.r,this.r/5*7)
              pop()
              stroke(50)
              strokeWeight(2)
              line(-this.r/2,this.r/3,this.r/2,-this.r/3)
              line(-this.r/2,-this.r/3,this.r/2,this.r/3)

    
              stroke(this.color)
              strokeWeight(4)
              noFill()
              angleMode(RADIANS)
              for(var j=0;j<9;j++){
                rotate(PI/10)
                beginShape()
                for(var i=0;i<(this.r/3);i++){
                  line(this.r/2,0,this.r,0)
                }
              }
                endShape()
              
            pop()
          }
    
    }

    update(){//計算出移動元件後的位置
        this.p.add(this.v)

        if(this.p.x<=0+this.r || this.p.x>=width-this.r){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0+this.r/2 || this.p.y>=height-this.r){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
        }

    isMonsterInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
        if(d<this.r){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
            return true //傳回true的值
        }
        else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
            return false //傳回false值
        }
    }

}
```

---

## 音效設定

### 音效檔案下載
https://drive.google.com/drive/folders/1rbsoRMM2wfV_sjE_l-uof_3-wDvNpP5W?usp=sharing

### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此

function preload(){ //準備執行之前，比setup()更早執行
  et_sound = loadSound("sound/yaha.wav");
  bullet_sound = loadSound("sound/shot.mp3");
  monster_sound = loadSound("sound/yaho.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  
}

function draw() {
  background(0);

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(et.isEtInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的et
        ets.splice(ets.indexOf(et),1) //從倉庫ets裡取出被滑鼠按到的物件編號(ets.indexOf(et),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)   
        et_sound.play()      
      }
    }
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的ball
        bullets.splice(bullets.indexOf(bullet),1)      
        monster_sound.play()
        monster.dead = true   
      }
    }
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(width/2,height/2)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
  bullet_sound.play()
}
```

---
## 弓箭隨著鍵盤按鍵上下左右移動

### 執行後的圖片
![](https://hackmd.io/_uploads/HkGjkN1U2.gif)


### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定弓箭位移
var shipP

function preload(){ //準備執行之前，比setup()更早執行
  et_sound = loadSound("sound/yaha.wav");
  bullet_sound = loadSound("sound/shot.mp3");
  monster_sound = loadSound("sound/yaho.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  
}

function draw() {
  background(0);

  //鍵盤移動弓箭
  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }
  }

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(et.isEtInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的et
        ets.splice(ets.indexOf(et),1) //從倉庫ets裡取出被滑鼠按到的物件編號(ets.indexOf(et),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)   
        et_sound.play()  
      }
    }
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }

  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的ball
        bullets.splice(bullets.indexOf(bullet),1)      
        monster_sound.play()
        monster.dead = true   
      }
    }
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(shipP.x,shipP.y)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
    bullets.push(bullet)
    bullet_sound.play()
  }
}
```

#### bullet.js
```javascript=
 var bullet_colors = "355070-6d597a-b56576-e56b6f-eaac8".split("-").map(a=>"#"+a)


//定義一個飛鏢(bullet)物件的class

class Bullet{
    constructor(args){
        this.r = args.r || 10 //設計飛鏢有大有小時，就傳參數args.r來設定飛鏢大小，沒有傳參數就以10為準
        this.p = args.p || shipP.copy()
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.color = args.color || random(bullet_colors)
  
    }
    draw(){ //畫出物件程式碼
        push()
          translate(this.p.x,this.p.y)
          let dx = mouseX - width/2 //算出滑鼠與中心點的距離
          let dy = mouseY - height/2 //算出滑鼠與中心點的距離
          let angle = atan2(dy,dx)
          rotate(angle)
          fill(this.color)
          noStroke()
          triangle(this.r/2,this.r/4,-this.r/2,this.r/4,0,this.r*2)
          triangle(this.r/4,this.r/2,this.r/4,-this.r/2,this.r*2,0)
          triangle(this.r/2,-this.r/4,-this.r/2,-this.r/4,0,-this.r*2)
          triangle(-this.r/4,this.r/2,-this.r/4,-this.r/2,-this.r*2,0)
          fill(0)
          line(0,0,0,this.r*2)
          line(0,0,0,-this.r*2)
          line(0,0,this.r*2,0)
          line(0,0,-this.r*2,0)
          fill(220)
          ellipse(0,0,this.r/2)
          fill(255)
          ellipse(0,0,this.r/3)
          pop()
  
    }
    update(){ //計算出移動後的位置
        this.p.add(this.v)
    }
  }
```

---

## 設置三隻小貓移動速度較快

### 執行後的圖片
![](https://hackmd.io/_uploads/rk_Ui7JLn.gif)

### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];
//自己畫的圖（貓）
let points2 = [[0,10],[2,10],[3,12],[4,10],[4,4],[6,4],[6,2],[8,2],[8,0],[10,0],[10,-2],[12,-2],[12,-10],[10,-12],[-5,-12],[-11,-7],[-11,-5],[-9,-5],[-5,-10],[-2,-10],[-2,-8],[0,-8],[0,-2],[-2,-2],[-2,4],[-4,4],[-4,10],[-3,12],[-2,10],[0,10],[2,10],[3,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定貓的物件變數
var cat //把目前要處理的物件，暫存到cat變數內
var cats = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定弓箭位移
var shipP

function preload(){ //準備執行之前，比setup()更早執行
  et_sound = loadSound("sound/yaha.wav");
  bullet_sound = loadSound("sound/shot.mp3");
  monster_sound = loadSound("sound/yaho.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  for(var i=0;i<3;i=i+1){ //i<3等於隨機製造3隻貓
    cat = new Cat() //產生一個Cat class元件
    cats.push(cat) //把cat的物件放入到cats陣列內
  }
  
}

function draw() {
  background(0);

  //鍵盤移動弓箭
  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }
  }

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(et.isEtInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的et
        ets.splice(ets.indexOf(et),1) //從倉庫ets裡取出被滑鼠按到的物件編號(ets.indexOf(et),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)   
        et_sound.play()  
      }
    }
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }
  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的ball
        bullets.splice(bullets.indexOf(bullet),1)      
        monster_sound.play()
        monster.dead = true   
      }
    }
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(shipP.x,shipP.y)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣

  //貓的顯示(cat)
  for(let cat of cats){
    cat.draw()
    cat.update()
    if(cat.isCatInRanger(shipP.x,shipP.y)){ //貓有沒有接觸現在的弓箭
      cats.splice(cats.indexOf(cat),1) //從倉庫cats裡取出被滑鼠按到的物件編號(cats.indexOf(cat),1)，只取一個 
    }
  }
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
    bullets.push(bullet)
    bullet_sound.play()
  }
}
```

#### cat.js
```javascript=
//顏色設定
var cat_colors = "ffcdb2-ffb4a2-e5989b-b5838d-6d6875".split("-").map(a=>"#"+a) //本體
var cat_colors2 = "ffe5ec-ffc2d1-ffb3c6-ff8fab-fb6f92".split("-").map(a=>"#"+a) //框線

//宣告一個類別Cat，針對一個畫的圖案
class Cat{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = 4 //描述為該物件的放大倍率
      this.color = random(cat_colors) //充滿顏色
      this.stroke = random(cat_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points2.length;k=k+1){
              curveVertex(points2[k][0]*this.size,points2[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*4 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*4 //現在的位置(y)加上現在的速度(y)
        if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
      }

    isCatInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<12*this.size){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
        return true //傳回true的值
      }
      else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
        return false //傳回false值
      }
    }
}
```

#### index.html
```javascript=
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Sketch</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="libraries/p5.sound.min.js"></script>
  </head>

  <body>
    <script src="sketch.js"></script>
    <script src="et.js"></script>
    <script src="bullet.js"></script>   
    <script src="monster.js"></script>
    <script src="cat.js"></script>
  </body>
</html>

```

---

## 設置血量計算
初始血量：5
打中怪物加2血，打中外星生物扣1血，弓箭碰到貓扣3血

### 執行後的圖片
![](https://hackmd.io/_uploads/r1nK5mJUh.gif)

### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];
//自己畫的圖（貓）
let points2 = [[0,10],[2,10],[3,12],[4,10],[4,4],[6,4],[6,2],[8,2],[8,0],[10,0],[10,-2],[12,-2],[12,-10],[10,-12],[-5,-12],[-11,-7],[-11,-5],[-9,-5],[-5,-10],[-2,-10],[-2,-8],[0,-8],[0,-2],[-2,-2],[-2,4],[-4,4],[-4,10],[-3,12],[-2,10],[0,10],[2,10],[3,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定貓的物件變數
var cat //把目前要處理的物件，暫存到cat變數內
var cats = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定弓箭位移
var shipP
//分數
var score = 5 //設定一個值初始為０

function preload(){ //準備執行之前，比setup()更早執行
  et_sound = loadSound("sound/yaha.wav");
  bullet_sound = loadSound("sound/shot.mp3");
  monster_sound = loadSound("sound/yaho.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)
  
  //Et的繪圖設定
  for(var i=0;i<20;i=i+1){ //i<20等於隨機製造20隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  for(var i=0;i<3;i=i+1){ //i<3等於隨機製造3隻貓
    cat = new Cat() //產生一個Cat class元件
    cats.push(cat) //把cat的物件放入到cats陣列內
  }
  
}

function draw() {
  background(0);

  //鍵盤移動弓箭
  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }
  }

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(et.isEtInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的et
        ets.splice(ets.indexOf(et),1) //從倉庫ets裡取出被滑鼠按到的物件編號(ets.indexOf(et),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)   
        et_sound.play()  
        score = score - 1 //每按到一個，-1血
      }
    }
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }
  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的ball
        bullets.splice(bullets.indexOf(bullet),1)      
        monster_sound.play()
        monster.dead = true   
        score = score + 2 //每按到一個，+2血
      }
    }
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(shipP.x,shipP.y)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣

  //貓的顯示(cat)
  for(let cat of cats){
    cat.draw()
    cat.update()
    if(cat.isCatInRanger(shipP.x,shipP.y)){ //貓有沒有接觸現在的弓箭
      cats.splice(cats.indexOf(cat),1) //從倉庫cats裡取出被滑鼠按到的物件編號(cats.indexOf(cat),1)，只取一個 
      score = score - 3 //每碰到一次，-3血
    }
  }

  //文字設定
  push()
    fill(255)
    textSize(50)
    text("血量："+score,50,60) //在座標為(50,60)，顯示score內容
  pop()
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
    bullets.push(bullet)
    bullet_sound.play()
  }
}
```

---

## 結束後顯示畫面及音樂，加上規則
遊戲左下角寫遊戲規則，並增加遊戲結束音效

### 執行後的圖片
![](https://hackmd.io/_uploads/BkNOB7183.gif)

### 實際的程式碼

#### sketch.js
```javascript=
//自己畫的圖（外星生物）
let points = [[0,6],[1,6],[1,12],[8,12],[8,8],[6,8],[6,4],[8,4],[8,-12],[-11,-12],[-11,-10],[-7,-10],[-7,4],[-5,4],[-5,8],[-7,8],[-7,12],[-1,12],[-1,6],[0,6],[1,6],[1,12]];
//自己畫的圖（貓）
let points2 = [[0,10],[2,10],[3,12],[4,10],[4,4],[6,4],[6,2],[8,2],[8,0],[10,0],[10,-2],[12,-2],[12,-10],[10,-12],[-5,-12],[-11,-7],[-11,-5],[-9,-5],[-5,-10],[-2,-10],[-2,-8],[0,-8],[0,-2],[-2,-2],[-2,4],[-4,4],[-4,10],[-3,12],[-2,10],[0,10],[2,10],[3,12]];

//設定外星生物的物件變數
var et //把目前要處理的物件，暫存到et變數內
var ets =[] //把產生的"所有"物件，存為陣列
//設定飛鏢的物件變數
var bullet //把目前要處理的物件，暫存到bullet變數內
var bullets = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定怪物的物件變數
var monster //把目前要處理的物件，暫存到monster變數內
var monsters = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定貓的物件變數
var cat //把目前要處理的物件，暫存到cat變數內
var cats = [] //把產生的"所有"物件，為物件的倉庫，所有的物件資料都在此
//設定弓箭位移
var shipP
//分數
var score = 5 //設定一個值初始為０

function preload(){ //準備執行之前，比setup()更早執行
  et_sound = loadSound("sound/yaha.wav");
  bullet_sound = loadSound("sound/shot.mp3");
  monster_sound = loadSound("sound/yaho.wav");
  fail_sound = loadSound("sound/fail.mp3");
  success_sound = loadSound("sound/success.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  shipP = createVector(width/2,height/2)
  
  //Et的繪圖設定
  for(var i=0;i<8;i=i+1){ //i<8等於隨機製造8隻生物
    et = new Et() //產生一個Et class元件
    ets.push(et) //把et的物件放入到ets陣列內
  }
  //Monster的繪圖設定
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個monster class元件
    monsters.push(monster) //把monster的物件放入到monsters陣列內
  }
  for(var i=0;i<3;i=i+1){ //i<3等於隨機製造3隻貓
    cat = new Cat() //產生一個Cat class元件
    cats.push(cat) //把cat的物件放入到cats陣列內
  }
  
}

function draw() {
  background(0);

  //鍵盤移動弓箭
  if(keyIsPressed){
    if(key=="ArrowRight" || key=="d"){ //下往右鍵或d往右移動
      shipP.x = shipP.x+5
    }
  
    if(key=="ArrowLeft" || key=="a"){ //按往左鍵或a往左移動0
      shipP.x = shipP.x-5
    }
  
    if(key=="ArrowUp" || key=="w"){ //按往上鍵或w往上移動
      shipP.y = shipP.y-5
    }
  
    if(key=="ArrowDown" || key=="s"){ //按往下鍵或s往下移動
      shipP.y = shipP.y+5
    }
  }

  //外星生物的顯示(et)
  for(let et of ets){
    et.draw()
    et.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(et.isEtInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的et
        ets.splice(ets.indexOf(et),1) //從倉庫ets裡取出被滑鼠按到的物件編號(ets.indexOf(et),1)，只取一個
        bullets.splice(bullets.indexOf(bullet),1)   
        et_sound.play()  
        score = score - 1 //每按到一個，-1分
        if(score<=0){
          fail_sound.play()
        }
      }
    }
  }
  //飛鏢的顯示(bullet)
  for(let bullet of bullets){ //只要是陣列的方式，都可以利用此方式處理
    bullet.draw()
    bullet.update()
  }
  //怪物的顯示(monster)
  for(let monster of monsters){ //只要是陣列的方式，都可以利用此方式處理
    if(monster.dead == true && monster.timenum>4 ){
      monsters.splice(monsters.indexOf(monster),1)
    }
    monster.draw()
    monster.update()
    for(let bullet of bullets){ //檢查每一個物件
      if(monster.isMonsterInRanger(bullet.p.x,bullet.p.y)){ //飛鏢物件有沒有接觸現在的ball
        bullets.splice(bullets.indexOf(bullet),1)      
        monster_sound.play()
        monster.dead = true   
        score = score + 2 //每按到一個，+2分
        if(monsters.length == 1){
          success_sound.play()
        }
      }
    }
   }

  //畫出弓箭，放置在視窗中央，讓弓箭尖端對準滑鼠鼠標
  push() //開始設定
  let dx = mouseX - width/2 //算出滑鼠與中心點的距離
  let dy = mouseY - height/2 //算出滑鼠與中心點的距離
  let angle = atan2(dy,dx) 
    translate(shipP.x,shipP.y)
    rotate(angle)
    stroke(255)
    arc(0,0,50,60,-PI/2,PI/2)
    noStroke()
    fill("#ffafcc")
    triangle(30,5,30,-5,40,0) //設定三個點，畫成三角形
    stroke("#cdb4db")
    strokeWeight(5)
    line(0,-30,0,30)
    line(30,0,-20,0)
  pop() //設定恢復原樣

  //貓的顯示(cat)
  for(let cat of cats){
    cat.draw()
    cat.update()
    if(cat.isCatInRanger(shipP.x,shipP.y)){ //貓有沒有接觸現在的弓箭
      cats.splice(cats.indexOf(cat),1) //從倉庫cats裡取出被滑鼠按到的物件編號(cats.indexOf(cat),1)，只取一個 
      score = score - 3 //每碰到一次，-3分
      if(score<=0){
        fail_sound.play()
      }
    }
  }

  //文字設定
  push()
    fill(255)
    textSize(50)
    text("血量："+score,50,60) //在座標為(50,50)，顯示score內容
    textSize(20)
    text("空白鍵/滑鼠左鍵射擊；鍵盤上下左右(wsad)控制弓箭移動",30,height-60)
    text("愛心怪物+2血，外星生物-1血，弓箭碰到貓-3血",30,height-40)
    text("目標：消滅所有愛心怪物，血量不可歸零",30,height-20)
  pop()

    //結束畫面
    if(score<=0){
      ets.splice(0,ets.length)
      cats.splice(0,cats.length)
      rectMode(CENTER)
      background("#efd3d7")
      fill("#e29578")
      noStroke()
      rect(width/2,height/2,width-100,height-100)
  
      push()
        fill(0)
        textSize(100)
        text("遊戲失敗",width/2-200,height/2) //在座標為(width/2-300,height/2)，顯示score內容
      pop()
    }
    else if(score>0 && monsters.length == 0){
      ets.splice(0,ets.length)
      cats.splice(0,cats.length)
      rectMode(CENTER)
      background("#efd3d7")
      fill("#e29578")
      noStroke()
      rect(width/2,height/2,width-100,height-100)
  
      push()
        fill(0)
        textSize(100)
        text("遊戲勝利",width/2-200,height/2) //在座標為(width/2-300,height/2)，顯示score內容
      pop()
    }
}

function mousePressed(){ //按一下產生一個飛鏢
  bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛鏢(Bullet class)
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){ //按下空白鍵
    bullet = new Bullet({}) //在滑鼠按下的地方產生一個新的飛彈(Bullet class)
    bullets.push(bullet)
    bullet_sound.play()
  }
}
```

#### et.js
```javascript=
//顏色設定
var et_colors = "001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226".split("-").map(a=>"#"+a) //本體
var et_colors2 = "8e9aaf-cbc0d3-efd3d7-feeafa-dee2ff".split("-").map(a=>"#"+a) //框線

//宣告一個類別Et，針對一個畫的圖案
class Et{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = random(5,10) //描述為該物件的放大倍率
      this.color = random(et_colors) //充滿顏色
      this.stroke = random(et_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points.length;k=k+1){
              curveVertex(points[k][0]*this.size,points[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*2 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*2 //現在的位置(y)加上現在的速度(y)
        if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
      }

    isEtInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<12*this.size){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
        return true //傳回true的值
      }
      else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
        return false //傳回false值
      }
    }
}

  
```

#### bullet.js
```javascript=
var bullet_colors = "355070-6d597a-b56576-e56b6f-eaac8".split("-").map(a=>"#"+a)


//定義一個飛鏢(bullet)物件的class

class Bullet{
    constructor(args){
        this.r = args.r || 10 //設計飛鏢有大有小時，就傳參數args.r來設定飛鏢大小，沒有傳參數就以10為準
        this.p = args.p || shipP.copy()
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)
        this.color = args.color || random(bullet_colors)
  
    }
    draw(){ //畫出物件程式碼
        push()
          translate(this.p.x,this.p.y)
          let dx = mouseX - width/2 //算出滑鼠與中心點的距離
          let dy = mouseY - height/2 //算出滑鼠與中心點的距離
          let angle = atan2(dy,dx)
          rotate(angle)
          fill(this.color)
          noStroke()
          triangle(this.r/2,this.r/4,-this.r/2,this.r/4,0,this.r*2)
          triangle(this.r/4,this.r/2,this.r/4,-this.r/2,this.r*2,0)
          triangle(this.r/2,-this.r/4,-this.r/2,-this.r/4,0,-this.r*2)
          triangle(-this.r/4,this.r/2,-this.r/4,-this.r/2,-this.r*2,0)
          fill(0)
          line(0,0,0,this.r*2)
          line(0,0,0,-this.r*2)
          line(0,0,this.r*2,0)
          line(0,0,-this.r*2,0)
          fill(220)
          ellipse(0,0,this.r/2)
          fill(255)
          ellipse(0,0,this.r/3)
          pop()
  
    }
    update(){ //計算出移動後的位置
        this.p.add(this.v)
    }
  }
```


#### monster.js
```javascript=
var monster_colors = "f6bd60-f7ede2-f5cac3-84a59d-f28482".split("-").map(a=>"#"+a)

var eyes_colors = "2f4858-33658a-86bbd8-f6ae2d-f26419".split("-").map(a=>"#"+a)


class Monster{ //宣告一個怪物類別，名稱為Monster
    constructor(args){
        this.r = args.r || random(50,100) //設計怪物的主體，就傳參數args.r來設定怪物大小，沒有傳參數就以10為準
        this.p = args.p || createVector(random(0+this.r,width-this.r),random(0+this.r,height-this.r)) //建立一個向量，由電腦亂數抽取顯示的初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數，就會利用亂數(-1,1)
        this.color = args.color || random(monster_colors)
        this.eyescolor = args.eyescolor || random(eyes_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //活著
        this.timenum = 0 //延長時間
    }
    draw(){ //畫出元件
        if(this.dead == false){
        push()
          translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
          fill(this.color)
          noStroke()
          push()
            angleMode(DEGREES)
            rotate(35)
            ellipse(this.r/4,0,this.r,this.r/5*7)
            rotate(290)
            ellipse(-this.r/4,0,this.r,this.r/5*7)
          pop()
          if(this.mode=="happy"){
            fill(255)
            ellipse(-this.r/3,0,this.r/2)
            ellipse(this.r/3,0,this.r/2)
            fill(this.eyescolor)
            ellipse(-this.r/3,0,this.r/3)
            ellipse(this.r/3,0,this.r/3)
            fill(255)
            ellipse(-this.r/3,0,this.r/8)
            ellipse(this.r/3,0,this.r/8)
          }
          else{
            fill(0)
            arc(-this.r/3,0,this.r/2,this.r/2,0,180)
            arc(this.r/3,0,this.r/2,this.r/2,0,180)
            fill(this.eyescolor)
            arc(-this.r/3,0,this.r/3,this.r/3,0,180)
            arc(this.r/3,0,this.r/3,this.r/3,0,180)
            fill(255)
            arc(-this.r/3,0,this.r/8,this.r/8,0,180)
            arc(this.r/3,0,this.r/8,this.r/8,0,180)
          }
          stroke(this.color)
          strokeWeight(4)
          noFill()
          angleMode(RADIANS)
          for(var j=0;j<9;j++){
            rotate(PI/10)
            beginShape()
            for(var i=0;i<(this.r/3);i++){
                vertex(this.r/1.5+i,sin(i/5+frameCount/10)*10)
            }

            endShape()
          }

        pop() //恢復原點到整個視窗左上
        }
        else{ //怪物死亡畫面
            this.timenum = this.timenum+1
            push()
              translate(this.p.x,this.p.y) //把原點(0,0)移到物件中心位置
              fill(this.color)
              noStroke()
              push()
                angleMode(DEGREES)
                rotate(35)
                ellipse(this.r/4,0,this.r,this.r/5*7)
                rotate(290)
                ellipse(-this.r/4,0,this.r,this.r/5*7)
              pop()
              stroke(50)
              strokeWeight(2)
              line(-this.r/2,this.r/3,this.r/2,-this.r/3)
              line(-this.r/2,-this.r/3,this.r/2,this.r/3)

    
              stroke(this.color)
              strokeWeight(4)
              noFill()
              angleMode(RADIANS)
              for(var j=0;j<9;j++){
                rotate(PI/10)
                beginShape()
                for(var i=0;i<(this.r/3);i++){
                  line(this.r/2,0,this.r,0)
                }
              }
                endShape()
              
            pop()
          }
    
    }

    update(){//計算出移動元件後的位置
        this.p.add(this.v)

        if(this.p.x<=0+this.r || this.p.x>=width-this.r){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0+this.r/2 || this.p.y>=height-this.r){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
        }

    isMonsterInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
        if(d<this.r){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
            return true //傳回true的值
        }
        else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
            return false //傳回false值
        }
    }

}
```

#### cat.js
```javascript=
//顏色設定
var cat_colors = "ffcdb2-ffb4a2-e5989b-b5838d-6d6875".split("-").map(a=>"#"+a) //本體
var cat_colors2 = "ffe5ec-ffc2d1-ffb3c6-ff8fab-fb6f92".split("-").map(a=>"#"+a) //框線

//宣告一個類別Cat，針對一個畫的圖案
class Cat{ 
    constructor(){ //預設值，基本資料(物件的顏色，移動速度，大小，初始位置......)
      this.p = { x:random(0,width), y:random(0,height) } //描述為該物件的初始位置
      this.v = { x:random(-1,1), y:random(-1,1) } //描述為該物件的移速
      this.size = 4 //描述為該物件的放大倍率
      this.color = random(cat_colors) //充滿顏色
      this.stroke = random(cat_colors2) //外框線條顏色
    }

    draw(){ //畫出形狀
        push() //執行後，依照以下設定
          translate(this.p.x,this.p.y) //以讓物件位置為原點
          scale(1,-1) //如果this.v.x<0條件成立，則為1，若不成立，則為-1；代表往右走的圖形象鼻向右，向左的則象鼻向左
          fill(this.color)
          stroke(this.stroke)
          strokeWeight(3)
          beginShape()
            for(var k=0;k<points2.length;k=k+1){
              curveVertex(points2[k][0]*this.size,points2[k][1]*this.size) //畫圖為圓弧方式畫，要把上面迴圈points.length-1的-1刪除
            }
          endShape()
        pop() //執行後，回到原始的設定
    }    
    update(){ //圖形的移動
        this.p.x = this.p.x + this.v.x*4 //現在的位置(x)加上現在的速度(x)
        this.p.y = this.p.y + this.v.y*4 //現在的位置(y)加上現在的速度(y)
        if(this.p.x<=0 || this.p.x>=width){ //x軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.x = -this.v.x //把x軸的速度方向改變
          }
          if(this.p.y<=0 || this.p.y>=height){ //y軸碰到左邊(<=0)或者碰到右邊(x>=width)
            this.v.y = -this.v.y //把y軸的速度方向改變
          }
      }

    isCatInRanger(x,y){ //功能:判斷滑鼠按下的位置是否在此物件的範圍內
      let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
      if(d<12*this.size){ //滑鼠與物件的距離小於物件的寬度，代表碰到了
        return true //傳回true的值
      }
      else{ //滑鼠與物件的距離大於物件的寬度，代表沒有碰到
        return false //傳回false值
      }
    }
}

  
```

---

## 完成的github網址
 https://tingchiu04.github.io/0527/
