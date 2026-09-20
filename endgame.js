let player=document.querySelector('#player');
let SecPlayer=document.querySelector('#sec-player');
let canvas=document.querySelector('#dust');
let ctx=canvas.getContext('2d');

player.src="../resources/videos/fingerSnap.mp4";
player.currentTime=0;

player.addEventListener('loadedmetadata',function(){
  player.currentTime=0;
  player.play();
});

player.addEventListener('timeupdate',function(){
  if(player.currentTime>=39){
    player.pause();
    player.style.display='none';

    SecPlayer.src="../resources/videos/encore.mp4";
    SecPlayer.currentTime=81;
    SecPlayer.style.display='block';
    SecPlayer.play();
  }
});

let dustStarted=false;

SecPlayer.addEventListener('timeupdate',function(){
  if(SecPlayer.currentTime>=95.5&&!dustStarted){
    dustStarted=true;
    SecPlayer.pause();
    createDust();
  }
});

function createDust(){
  let maxWidth=window.innerWidth;
  let maxHeight=window.innerHeight;
  let scale=Math.min(maxWidth/SecPlayer.videoWidth,maxHeight/SecPlayer.videoHeight);

  canvas.width=Math.floor(SecPlayer.videoWidth*scale);
  canvas.height=Math.floor(SecPlayer.videoHeight*scale);

  ctx.drawImage(SecPlayer,0,0,canvas.width,canvas.height);

  SecPlayer.style.display='none';
  canvas.style.display='block';

  let pieces=[];
  let size=13;

  for(let y=0;y<canvas.height;y+=size){
    for(let x=0;x<canvas.width;x+=size){
      let image=ctx.getImageData(x,y,size,size);

      let pieceCanvas=document.createElement('canvas');
      pieceCanvas.width=size;
      pieceCanvas.height=size;

      let pieceCtx=pieceCanvas.getContext('2d');
      pieceCtx.putImageData(image,0,0);

      pieces.push({
        x:x,
        y:y,
        canvas:pieceCanvas,
        vx:Math.random()*5+3,
        vy:-(Math.random()*5+2),
        rotation:Math.random()*360,
        rotationSpeed:Math.random()*10-5,
        alpha:1
      });
    }
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);

  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    pieces.forEach(function(piece){
      piece.x+=piece.vx;
      piece.y+=piece.vy;
      piece.vy+=0.03;
      piece.rotation+=piece.rotationSpeed;
      piece.alpha-=0.006;

      if(piece.alpha<=0){
        return;
      }

      ctx.save();
      ctx.globalAlpha=piece.alpha;
      ctx.translate(piece.x+size/2,piece.y+size/2);
      ctx.rotate(piece.rotation*Math.PI/180);
      ctx.drawImage(piece.canvas,-size/2,-size/2);
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}