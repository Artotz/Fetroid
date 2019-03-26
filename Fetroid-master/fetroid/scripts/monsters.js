class mob {
    constructor(spawnI, spawnJ, gridNumber){
      this.spawnI = spawnI;
      this.spawnJ = spawnJ;
      this.gridNumber = gridNumber;

    }

}

class mob1 extends mob {
  constructor(spawnI, spawnJ, gridNumber){
    super(spawnI, spawnJ, gridNumber);
    this.range = 200;
    this.vel = 2;
    this.x = spawnJ * tile;
    this.y = spawnI * tile;
    this.width = 50;
    this.height = 50;
  }

  update(){
      // MOVIMENTO
      if (this.x + this.vel > (this.spawnJ * tile) + 100 || this.x + this.vel < (this.spawnJ * tile) - 100)
        this.vel = this.vel * (-1);

      this.x = this.x + this.vel;
  }
  draw(){
    ctx.fillStyle ='Orange';
    ctx.fillRect(this.x - offset.x, this.y - offset.y, this.width, this.height);
  }

}
