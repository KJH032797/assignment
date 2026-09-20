let Vplayer;
let Aplayer;

let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

let fstTag = document.getElementsByTagName('script')[0];

fstTag.parentNode.insertBefore(tag,fstTag);

function onYouTubeIframeAPIReady(){
  Aplayer = new YT.Player('a-player',{
    videoId : 'FlD6IuN7ftU',
    playerVars : {
      autoplay : 1,
      controls : 0,
      playsinline : 1
    },
    events : {
      onReady:function(event){
        Aplayer.loadVideoById({
          videoId:'FlD6IuN7ftU',
          startSeconds:3.5,
          endSeconds:11
        });
      },
      onStateChange:onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event){
  if (event.data === YT.PlayerState.ENDED){
    Vplayer=new YT.Player('v-player',{
      videoId:"OBrDE0WyAP4",
      playerVars:{
        autoplay:1,
        controls:0,
        playsinline:1
      },
      events : {
      onReady:function(event){
        Vplayer.loadVideoById({
          videoId:'OBrDE0WyAP4',
          startSeconds:197,
          endSeconds:211.7
        });
      },
      onStateChange:function(event){
        if(event.data===YT.PlayerState.PLAYING){
          checkTime();
          checkText();
        }
        if(event.data===YT.PlayerState.ENDED){Vplayer.destroy();}
      }
    }
  });
}}

function checkTime(){
  if(Vplayer && Vplayer.getCurrentTime()>=210.7){
    document.querySelector('.brush-text').classList.add('show-text');
    return;
  }
  setTimeout(checkTime, 100);
}

function checkText(){
  let time = Vplayer.getCurrentTime();
  if(time>=198.7){
    document.querySelector('.text1').classList.add('show-text');
  }
  if(time>=200){
    document.querySelector('.text1').style.display='none';
  }
  if(time>=201.5){
    document.querySelector('.text2').classList.add('show-text');
  }
  if(time>=202.5){
    document.querySelector('.text2').style.display='none';
  }
  if(time>=203.5){
    document.querySelector('.text3').classList.add('show-text');
  }
  if(time>=204.5){
    document.querySelector('.text3').style.display='none';
  }
  if(time>=205){
    document.querySelector('.text4').classList.add('show-text');
  }
  if(time>=206){
    document.querySelector('.text4').style.display='none';
  }
  setTimeout(checkText,100);
}