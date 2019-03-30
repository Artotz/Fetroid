class mob {
    constructor(spawnI, spawnJ){
      this.spawnI = spawnI;
      this.spawnJ = spawnJ;
    }
}

class morcego extends mob{
  constructor(spawnI, spawnJ, disX){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = disX;
    this.frames = 0;

    this.width = 30;
    this.height = 30;

    this.x = (spawnJ+1) * tile - tile/2 -this.width/2;
    this.y = (spawnI+1) * tile - tile/2 -this.height/2;
  }

  update(){
    this.frames++;
    if(this.invul > 0)
      this.invul--;

    //---------------------STARTING POINT--------------------
    this.x = (this.spawnJ+1) * tile - tile/2 -this.width/2  + ((1+2*this.disX)*tile-this.width)/2  * Math.sin(this.frames/40);
    this.y = (this.spawnI+1) * tile - tile/2 -this.height/2 + (10 * Math.sin(this.frames/5));
  }

  draw(){
    ctx.fillStyle = "#F0F";
    if(this.invul%4 == 0){
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);
      ctx.fillRect(this.x +this.width -offset.x, this.y -offset.y, 20, 10 - (12 * Math.sin(this.frames/5)));
      ctx.fillRect(this.x -offset.x, this.y -offset.y, -20, 10 - (12 * Math.sin(this.frames/5)));
    }
  }

  onHit(){
    this.hp--;
    this.invul = 40;
  }
}

class vaievolta extends mob{
  constructor(spawnI, spawnJ, disX){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.disX = disX;
    this.frames = 0;

    this.width = 30;
    this.height = 30;

    this.x = (spawnJ) * tile +this.width;
    this.y = (spawnI+1) * tile -this.height;
  }

  update(){
    this.frames++;
    if(this.invul > 0)
      this.invul--;

    //---------------------STARTING POINT--------------------
    this.x = (this.spawnJ+1) * tile - tile/2 -this.width/2  + ((1+2*this.disX)*tile-this.width)/2  * Math.sin(this.frames/40);
  }

  draw(){
    ctx.fillStyle = "#F0F";
    if(this.invul%4 == 0){
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);
    }
  }

  onHit(){
    this.hp--;
    this.invul = 40;
  }
}

class girador extends mob{
  constructor(spawnI, spawnJ, disX, disY){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.vel = 4;

    this.disX = disX;
    this.disY = disY;
    this.state = 0;

    this.width = 30;
    this.height = 30;

    this.x = (spawnJ+1) * tile -this.width;
    this.y = (spawnI+1) * tile -this.height;
  }

  update(){
    if(this.invul > 0)
      this.invul--;

    switch(this.state){
      case 0:
        this.x += this.vel;
        if(this.x > (this.spawnJ+this.disX+1) * tile){
          this.x = (this.spawnJ+this.disX+1) * tile;
          this.state = 1;
        }
        break;
      case 1:
        this.y += this.vel;
        if(this.y > (this.spawnI+this.disY+1) * tile){
          this.y = (this.spawnI+this.disY+1) * tile;
          this.state = 2;
        }
        break;
      case 2:
        this.x -= this.vel;
        if(this.x < (this.spawnJ+1) * tile -this.width){
          this.x = (this.spawnJ+1) * tile -this.width;
          this.state = 3;
        }
        break;
      case 3:
        this.y -= this.vel;
        if(this.y < (this.spawnI+1) * tile -this.height){
          this.y = (this.spawnI+1) * tile -this.height;
          this.state = 0;
        }
        break;
    }
  }

  draw(){
    ctx.fillStyle = "#666";
    if(this.invul%4 == 0){
      ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);

      ctx.fillStyle = "#000";
      switch(this.state){
        case 0:
          ctx.fillRect(this.x +this.width -offset.x, this.y -offset.y +5, -20, 10);
          break;
        case 1:
          ctx.fillRect(this.x -15 +this.width -offset.x, this.y +this.height -offset.y, 10, -20);
          break;
        case 2:
          ctx.fillRect(this.x -offset.x, this.y +this.height -offset.y -5, 20, -10);
          break;
        case 3:
          ctx.fillRect(this.x +15 -offset.x, this.y -offset.y, -10, 20);
          break;
      }
    }

  }

  onHit(){
    this.hp--;
    this.invul = 40;
  }
}

class thwomp extends mob{
  constructor(spawnI, spawnJ, disY){
    super(spawnI, spawnJ);

    this.hp = 5;
    this.invul = 0;

    this.acc = 1;
    this.vel = 0;

    this.restTime = 200;
    this.shakeTime = 30;
    this.rest = 0;

    this.disY = disY;
    this.state = 0;

    this.width = 60;
    this.height = 60;

    this.x = (spawnJ) * tile +tile/2 -this.width/2;
    this.y = (spawnI) * tile;
  }

  update(){
    if(this.invul > 0)
      this.invul--;

    switch(this.state){
      case 0:
        if(this.rest > 0)
          this.rest--;
        if(this.rest == 0){
          if(((p1.x +p1.width/2 > (this.spawnJ)  * tile -tile/2 && p1.j <= this.spawnJ)
          || (p1.x -p1.width/2 < (this.spawnJ+1) * tile +tile/2 && p1.j >= this.spawnJ))
          && (p1.i >= this.spawnI && p1.i <= this.spawnI +this.disY +1)){
            this.state = 1;
            this.vel = 0;
            this.rest = this.shakeTime;
          }
        }
        break;
      case 1:
        if(this.rest > 0)
          this.rest--;
        if(this.rest == 0){
          this.vel += this.acc;
          this.y += this.vel;
          if(this.y > (this.spawnI +this.disY +1)*tile -this.height){
            this.y = (this.spawnI +this.disY +1)*tile -this.height;
            this.vel = 0;
            this.state = 2;
            this.rest = this.restTime;
          }
        }
        break;
      case 2:
        this.rest--;
        if(this.rest == 0){
          this.state = 3;
          this.vel = -2;
        }
        break;
      case 3:
        this.y += this.vel;
        if(this.y < (this.spawnI)*tile){
          this.y = (this.spawnI)*tile;
          this.rest = this.restTime;
          this.state = 0;
        }
        break;
    }
  }

  draw(){
    ctx.fillStyle = "#666";
    if(this.state == 1)
      ctx.fillStyle = "#F00";

    if(this.invul%4 == 0){
      if(this.state == 1 && this.rest > 0){
        var shake = 0;
        if(this.rest% 4 == 1)
          shake = -3;
        else if(this.rest% 4 == 1)
          shake =  3;

        ctx.fillRect(this.x -offset.x +shake, this.y -offset.y, this.width, this.height);

        ctx.fillStyle = "#000";
        //ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 -offset.x +shake, this.y +this.height/2 -offset.y +shake, 15, 0, 2*Math.PI, false);
        ctx.fill();

        var vetor = vetorUnit({x: this.x + this.width/2, y: this.y +this.height/2}, p1);
        ctx.fillStyle = "#F00";
        ctx.beginPath();
        ctx.arc(this.x + this.width/2 +10*vetor.x -offset.x +shake, this.y +this.height/2 +10*vetor.y -offset.y +shake, 5, 0, 2*Math.PI, false);
        ctx.fill();
      }
      else{
        if(this.state == 2 || this.state == 3 || (this.state == 0 && this.rest > 0)){
          ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);

          ctx.fillStyle = "#000";
          //ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 -offset.x, this.y +this.height/2 -offset.y, 15, 0, 2*Math.PI, false);
          ctx.fill();

          ctx.fillStyle = "#F00";
          ctx.fillRect(this.x +this.width/2 -offset.x -7.5, this.y +this.height/2 -offset.y -3, 15, 6);
        }
        else{
          ctx.fillRect(this.x -offset.x, this.y -offset.y, this.width, this.height);

          ctx.fillStyle = "#000";
          //ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 -offset.x, this.y +this.height/2 -offset.y, 15, 0, 2*Math.PI, false);
          ctx.fill();

          var vetor = vetorUnit({x: this.x + this.width/2, y: this.y +this.height/2}, p1);
          ctx.fillStyle = "#F00";
          ctx.beginPath();
          ctx.arc(this.x + this.width/2 +10*vetor.x -offset.x, this.y +this.height/2 +10*vetor.y -offset.y, 5, 0, 2*Math.PI, false);
          ctx.fill();
        }
      }
    }

    // ctx.fillStyle = "#660";
    // ctx.globalAlpha = 1/10;
    // ctx.fillRect(this.spawnJ*tile -offset.x -tile/2, this.spawnI*tile -offset.y, tile +tile , (this.spawnI +this.disY +1)*tile);
    // ctx.globalAlpha = 1;
  }

  onHit(){
    this.hp--;
    this.invul = 40;
  }

}
