let player;

let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";

let fstTag = document.getElementsByTagName('script')[0];

fstTag.parentNode.insertBefore(tag,fstTag);

function onYouTubeIframeAPIReady(){
  player = new YT.Player('player',{
    videoId : 'Bk6DeEedYGs',
    playerVars : {
      autoplay : 1,
      start : 90,
      end : 119,
      controls : 0,
      playsinline : 1
    },
    events : {onStateChange:onPlayerStateChange}
  });
}

function onPlayerStateChange(event){
  if (event.data === YT.PlayerState.ENDED){
    player.loadVideoById({
      videoId : 'f17J3AXVK5w'
    });
  }
}