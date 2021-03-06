var
  BLUE = 0,
  RED  = 1;

function areaManager(){

  this.salaAtual;

  this.mudarSala = function(sala){
    switch(sala){
      case 1:
        this.salaAtual = new sala_01();
        break;
      case 2:
        this.salaAtual = new sala_02();
        break;
      case 3:
        this.salaAtual = new sala_03();
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
    }

    gI = this.salaAtual.grid.length;
    gJ = this.salaAtual.grid[0].length;

    mapWidth = gJ * tile;
    mapHeight = gI * tile;

    mobList = [];
    this.salaAtual.fillMobList();
  }

  this.draw = function(){
    //GRELHA DOS QUADRADO-------------------------------------------------------
    ctx.strokeStyle = "#000";
    ctx.globalAlpha = 1/5;
    ctx.lineWidth = 2;
    for(var i = 0; i < gI+1; ++i){
      ctx.beginPath();
      ctx.moveTo(0 -offset.x, i*tile -offset.y);
      ctx.lineTo(mapWidth -offset.x, i*tile -offset.y);
      ctx.stroke();
    }

    for(var j = 0; j < gJ+1; ++j){
      ctx.beginPath();
      ctx.moveTo(j*tile -offset.x, 0 -offset.y);
      ctx.lineTo(j*tile -offset.x, mapHeight -offset.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    //GRELHA DOS QUADRADO-------------------------------------------------------

    // QUADRADOS
    // ctx.fillStyle = 'rgb(124, 0, 59)';
    ctx.fillStyle = 'hsl(341, 100%,' + (23 + 3*Math.sin(frames/60)) + '%)';

    for(var i = 0; i < gI; i++){
      for(var j = 0; j < gJ; j++){

        if(this.salaAtual.grid[i][j] == 1){
          ctx.fillRect(j * tile -offset.x, i * tile -offset.y, tile, tile);
        }

      }
    }

  }

}

function sala_01(){
  this.id = 1;

  this.grid = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1],
        [1,{sala: 2, playerI: 3, playerJ: 3},0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],

  this.fillMobList = function(){
    mobList.push(new thwomp(BLUE, 1, 3, 2));
    mobList.push(new girador(RED, 5, 7, 2, 1));
    mobList.push(new crazyJ(BLUE, 3, 6, 2));
    mobList.push(new pulador(RED, 9, 4, 3));
    mobList.push(new fentesma(BLUE, 9, 7, 3));
  }

}

function sala_02(){
  this.id = 2;

  this.grid = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{sala: 3, playerI: 1, playerJ: 1},1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],

  this.fillMobList = function(){

  }

}

function sala_03(){
  this.id = 3;

  this.grid = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,1,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],

  this.fillMobList = function(){

  }

  this.checkTeleport = function(){

  }

}
