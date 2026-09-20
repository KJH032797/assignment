let player;
let Aplayer;
let poster=document.querySelector('.poster');
let back=document.querySelector('.back');

history.pushState({page:'obsession'},'',location.href);

window.addEventListener('popstate',function(){
  history.go(1);
});

let tag=document.createElement('script');
tag.src="https://www.youtube.com/iframe_api";
let firstScriptTag=document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);

function onYouTubeIframeAPIReady(){
  player=new YT.Player('player',{
    videoId:'KDSwCAE0Bh0',
    playerVars:{
      autoplay:1,
      controls:0,
      playsinline:1
    },
    events:{
      onReady:function(event){
        event.target.playVideo();
      },
      onStateChange:function(event){
        if(event.data===YT.PlayerState.ENDED){
          player.destroy();
          document.querySelector('.video').style.display='none';
          poster.style.display='flex';
        }
      }
    }
  });
}

back.addEventListener('click',function(){
  document.body.classList.add('locked');

  Aplayer=new YT.Player('a-player',{
    videoId:'qFpDOn5Sfvo',
    playerVars:{
      autoplay:1,
      controls:0,
      playsinline:1
    },
    events:{
      onReady:function(event){
        event.target.playVideo();
      }
    }
  });
});