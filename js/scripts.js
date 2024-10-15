//about efct
document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('#about .container');
    const textCenter = document.querySelector('#about .text-center');
    const pElements = document.querySelectorAll('#about p');
  
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
  
    const xOffset = (clientX / innerWidth - 0.5) * 30; // 30px max offset
    const yOffset = (clientY / innerHeight - 0.5) * 30; // 30px max offset
  
    container.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(1.05)`;
    textCenter.style.transform = `translate3d(${xOffset / 2}px, ${yOffset / 2}px, 0)`;
    pElements.forEach(p => {
      p.style.transform = `translate3d(${xOffset / 3}px, ${yOffset / 3}px, 0)`;
    });
  });
  
  
  

//animation effect 
document.addEventListener('DOMContentLoaded', function() {
    var textWrapper = document.querySelector('.ml14 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline()
    .add({
        targets: '.ml14 .line',
        scaleX: [0,1],
        opacity: [0.5,1],
        easing: "easeInOutExpo",
        duration: 900
    }).add({
        targets: '.ml14 .letter',
        opacity: [0,1],
        translateX: [40,0],
        translateZ: 0,
        scaleX: [0.3, 1],
        easing: "easeOutExpo",
        duration: 800,
        offset: '-=600',
        delay: (el, i) => 150 + 25 * i
    }).add({
        targets: '.ml14',
        opacity: 1,
        duration: 0,
        easing: "easeOutExpo",
        delay: 1000
    });
});





// Event listeners for details elements
document.addEventListener('DOMContentLoaded', function () {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
        detail.addEventListener('mouseover', () => {
            detail.style.backgroundColor = '#444';
            detail.style.cursor = 'pointer';
        });
        detail.addEventListener('mouseout', () => {
            detail.style.backgroundColor = '#333';
        });
    });
});
