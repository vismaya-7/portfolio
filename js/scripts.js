container.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(1.05)`;
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




document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          // Collapse the navbar by removing the 'show' class
          navbarCollapse.classList.remove('show');
        }
      });
    });
  });
  






//about efct
document.addEventListener('mousemove', (e) => {
    const container = document.querySelector('#about .container');
    const textCenter = document.querySelector('#about .text-center');
    const pElements = document.querySelectorAll('#about p');
  
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
  
    const xOffset = (clientX / innerWidth - 0.5) * 30; // 30px max offset
    const yOffset = (clientY / innerHeight - 0.5) * 30; // 30px max offset
  
    container.style.transform = translate3d(${xOffset}px, ${yOffset}px, 0) scale(1.05);
    textCenter.style.transform = translate3d(${xOffset / 2}px, ${yOffset / 2}px, 0);
    pElements.forEach(p => {
      p.style.transform = translate3d(${xOffset / 3}px, ${yOffset / 3}px, 0);
    });
  });



  document.addEventListener("DOMContentLoaded", () => {
    const paragraph = document.querySelector(".ml14 .letters");
    const text = paragraph.textContent;
    paragraph.textContent = ""; // Clear the text initially

    // Wrap each character in a span for animation
    text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("animated-char");
        paragraph.appendChild(span);
    });

    window.addEventListener("scroll", () => {
        const sectionTop = paragraph.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Check if the paragraph is in the viewport
        if (sectionTop < windowHeight - 50) {
            paragraph.parentElement.parentElement.style.visibility = "visible";
            paragraph.parentElement.parentElement.style.opacity = "1";
            paragraph.parentElement.parentElement.style.transform = "translateY(0)";

            // Animate each character with a delay
            document.querySelectorAll(".animated-char").forEach((span, index) => {
                setTimeout(() => {
                    span.style.opacity = "1";
                    span.style.transform = "scale(1) rotate(0)";
                }, index * 50); // Adjust the delay for speed
            });
        }
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
  


// Typing effect for the headline
let textArray = [""];
let typingSpeed = 100;
let index = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < textArray[index].length) {
        document.getElementById('animated-text').innerHTML = textArray[index].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(deleteText, 1000);
    }
}








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


