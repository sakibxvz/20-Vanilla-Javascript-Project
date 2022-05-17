const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2
const holdTime = (totalTime / 5)

breathAnimation();
//breath animation
function breathAnimation() {
  text.innerText = 'Hold breath'
  container.className='container grow'

  setTimeout(() => {
    text.innerText = 'Hold breath';
     

    setTimeout(() => {
      text.innerText = 'Breath Out!';
      container.className = 'container shrink';
    },holdTime)
  },breathTime)
}

setInterval(breathAnimation,totalTime)