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