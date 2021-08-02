let Seq=[];
let humSeq=[];
let level=0;

const startBtn=document.querySelector('.js-start');
const info=document.querySelector('.js-info');
const container=document.querySelector('.js-container');
const heading=document.querySelector('.js-heading');

function cheerGen(){
	const cheer=['Perfect!','Bravo!','Genius!'];
  return cheer[Math.floor(Math.random()*cheer.length)];
}

function resetGame(msg)
{
  alert(msg);
  Seq=[];
  humSeq=[];
  level=0;
  info.classList.add('hidden');
  startBtn.classList.remove('hidden');
  heading.innerText='Simon Game';
  container.classList.add('unclickable');
}

function handleClick(tile){
	const index=humSeq.push(tile)-1;
	const sound=document.querySelector(`[data-sound='${tile}']`);
  sound.play();
  let remainingTaps=Seq.length-humSeq.length;
  if(humSeq[index]!==Seq[index])
  {
  	resetGame('Oops Wrong Tile! Restarting..');
  	return;
  }
  if(humSeq.length===Seq.length)
  {
  	if(humSeq.length===20)
    {
    	resetGame('You Won!!');
      return;
    }
    humSeq=[];
    info.innerText=cheerGen();
    setTimeout(()=>{
    	startRound();
    },1000);
    return;
  }
  info.innerText=`Your Turn: ${remainingTaps} Tap${remainingTaps>1?'s':''}`
}

function tileGen(){
	const tiles=['red','green','blue','yellow'];
  return tiles[Math.floor(Math.random()*tiles.length)];
}

function humanTurn(lvl){
	container.classList.remove('unclickable');
  info.innerText=`Your Turn: ${lvl} Tap${lvl>1?'s':''}`;
}

function displayTile(tile){
	const Tile=document.querySelector(`[data-tile='${tile}']`);
  const sound=document.querySelector(`[data-sound='${tile}']`);
  Tile.classList.add('activated');
  sound.play();
  setTimeout(()=>{
  	Tile.classList.remove('activated');
  }, 100);
}

function compTurn(seq){
	seq.forEach((color, index) => {
    setTimeout(() => {
      displayTile(color);
    }, (index + 1) * 600);
  });
}

function startRound(){
	level+=1;
  const newSeq=[...Seq];
  newSeq.push(tileGen());
 	container.classList.add('unclickable');
  info.innerText='Wait for Computer';
  heading.innerText=`Level ${level} of 20`;
  compTurn(newSeq);
  Seq=[...newSeq];
  setTimeout(()=>{
  	humanTurn(level);
  },(level*600)+1000);
}

function startGame(){
	startBtn.classList.add('hidden');
  info.classList.remove('hidden');
  startRound();
}

startBtn.addEventListener('click',startGame);
container.addEventListener('click',event=>{
	const {tile}=event.target.dataset;
  if(tile){
  	handleClick(tile);
  }
});