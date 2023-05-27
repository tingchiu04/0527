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