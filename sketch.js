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
      monsters.splice(0,monsters.length)
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
      monsters.splice(0,cats.length)
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