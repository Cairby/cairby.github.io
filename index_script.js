
window.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.scroll-content img');
    
  images.forEach((img) => {
    img.addEventListener('click', () => {
      const githubURL = img.parentElement.getAttribute('href');
      window.open(githubURL, '_blank');
    });
  });
});


  
  const contactSection = document.getElementById("contact");
  const contactImage = document.querySelector(".contact-image");

  contactSection.addEventListener("mousemove", handleMouseMove);

  function handleMouseMove(e) {
    const rect = contactSection.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const maxX = contactSection.offsetWidth;
    const maxY = contactSection.offsetHeight;

    contactImage.style.setProperty("--mouseX", mouseX / maxX * 100);
    contactImage.style.setProperty("--mouseY", mouseY / maxY * 100);
  }

  const projectItems = document.querySelectorAll('.project-item');

  projectItems.forEach((item) => {
    item.addEventListener('mousemove', handleMouseMove);
    item.addEventListener('mouseleave', handleMouseLeave);
  });

  function handleMouseMove(e) {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const maxX = item.offsetWidth;
    const maxY = item.offsetHeight;

    const projectImage = item.querySelector('.project-image');
    projectImage.style.setProperty('--mouseX', mouseX / maxX * 100);
    projectImage.style.setProperty('--mouseY', mouseY / maxY * 100);
  }

  function handleMouseLeave(e) {
    const item = e.currentTarget;
    const projectImage = item.querySelector('.project-image');
    projectImage.style.setProperty('--mouseX', 50); // Reset to center position
    projectImage.style.setProperty('--mouseY', 50); // Reset to center position
  }
  
  function validateForm() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    if (emailInput.validity.valid) {
      emailError.style.display = "none";
      // Form submission logic goes here
    } else {
      emailError.style.display = "block";
    }
  }

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  const aboutSection = document.querySelector('.about-page');
  const aboutText = document.querySelector('.about-page-text');

  if (isInViewport(aboutSection) && !aboutText.classList.contains('animate-typewriter')) {
    aboutText.classList.add('animate-typewriter');
  }
}




// Function to check if an element is in the viewport
function isInViewport(element) {
  const bounding = element.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}



let dot = document.createElement('div');
dot.className = "dot";
document.body.appendChild(dot);

let circle = document.createElement('div');
circle.className = "circle";
document.body.appendChild(circle);

window.addEventListener('mousemove', function(e) {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    circle.style.left = `${e.clientX}px`;
    circle.style.top = `${e.clientY}px`;
});

const clickableElements = document.querySelectorAll('a, button, input[type=submit], [onclick]');

clickableElements.forEach((element) => {
    element.addEventListener('mouseover', function() {
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    element.addEventListener('mouseout', function() {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Pure JavaScript
window.addEventListener('scroll', function () {
  const section = document.querySelector('.about-page-text');
  const position = section.getBoundingClientRect().top;

  const screenPosition = window.innerHeight / 1.3;

  if (position < screenPosition) {
    section.classList.add('fade-in');
  }
});

// JQuery
$(window).scroll(function() {
  var top_of_element = $(".about-page-text").offset().top;
  var bottom_of_element = $(".about-page-text").offset().top + $(".about-page-text").outerHeight();
  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
  var top_of_screen = $(window).scrollTop();

  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
    $(".about-page-text").addClass('fade-in');
  } else {
    // The element is not visible, do something else
  }
});

//for mobile
if (window.matchMedia("(max-width: 600px)").matches) {
  // The viewport is 600px or less
  console.log('This is a mobile device');
} else {
  // The viewport is greater than 600px
  console.log('This is not a mobile device');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const menu = document.querySelector('.menu');
    const menuToggle = document.querySelector('.menu-toggle-label input[type="checkbox"]');
    
    // Ensures the menu is hidden on page load.
    menu.style.right = '-300px';

    // Event listener for when the hamburger menu is clicked.
    menuToggle.addEventListener('change', (event) => {
        if(menuToggle.checked) {
            menu.style.right = '0';
        } else {
            menu.style.right = '-300px';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu');
  const menuToggle = document.querySelector('.menu-toggle-label input[type="checkbox"]');
  
  // Ensures the menu is hidden on page load.
  menu.style.right = '-300px';

  // Event listener for when the hamburger menu is clicked.
  menuToggle.addEventListener('change', () => {
      if(menuToggle.checked) {
          menu.style.right = '0';
      } else {
          menu.style.right = '-300px';
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const aboutSection = document.querySelector('.about-page-text');
  const underline = document.getElementById('underline');
  
  let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
  };
  
  let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              underline.style.width = '50%';
          } else {
              underline.style.width = '0';
          }
      });
  }, options);
  
  observer.observe(aboutSection);
});
