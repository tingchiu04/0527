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

  