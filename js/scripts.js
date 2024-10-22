




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



function deleteText() {
    if (charIndex > 0) {
        document.getElementById('animated-text').innerHTML = textArray[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, typingSpeed);
    } else {
        index = (index + 1) % textArray.length;
        setTimeout(typeText, 500);
    }
}

typeText();

// Particles.js configuration
particlesJS('particles-js',
{
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
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
