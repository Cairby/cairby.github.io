// Initialize canvas and context
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to store the shapes
let shapes = [];

// Mouse position variables
let mouseX = 0;
let mouseY = 0;

// Function to create a random shape
function createRandomShape() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const randNum = Math.random();
  let type;
  let radius;

  if (randNum < 0.20) {
    type = 0; // Circle
    radius = Math.random() * 70 + 15;
  } else if (randNum < 0.50) {
    type = 1; // Triangle
    radius = Math.random() * 70 + 15;
  } else if (randNum < 0.70) {
    type = 2; // Squiggle
    radius = Math.random() * 70 + 30; // Set a higher minimum radius for squiggles
  } else {
    type = 3; // Macaroni
    radius = Math.random() * 70 + 15;
  }

  const dx = (Math.random() - 0.5) * 2.5;
  const dy = (Math.random() - 0.5) * 2.5;
  const color = getRandomColor();
  const angularVelocity = (Math.random() - 0.5) * 0.1;
  let angle = 0;

  return { x, y, type, radius, dx, dy, color, angularVelocity, angle };
}




// Function to generate a random color excluding black
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  do {
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } while (color === '#000000'); // Exclude black color

  return color;
}

// Function to draw a shape
function drawShape(shape) {
  context.beginPath();
  context.save(); // Save the current context state

  // Translate and rotate the context to the shape's position and angle
  context.translate(shape.x, shape.y);
  context.rotate(shape.angle);

  context.fillStyle = shape.color;

  if (shape.type === 0) {
    // Draw Circle
    context.arc(0, 0, shape.radius, 0, Math.PI * 2);
    context.fill();
  } else if (shape.type === 1) {
    // Draw Triangle
    context.moveTo(0, -shape.radius);
    context.lineTo(shape.radius, shape.radius);
    context.lineTo(-shape.radius, shape.radius);
    context.closePath();
    context.fill();
  } else if (shape.type === 2) {
    // Draw Squiggle
    context.moveTo(-shape.radius, 0);
    context.bezierCurveTo(-shape.radius/2, -shape.radius/2, -shape.radius/2, shape.radius/2, 0, 0);
    context.bezierCurveTo(shape.radius/2, -shape.radius/2, shape.radius/2, shape.radius/2, shape.radius, 0);
    context.lineWidth = 15;
    context.strokeStyle = shape.color;
    context.stroke();
  } else if (shape.type === 3) {
    // Draw Macaroni
    context.arc(0, 0, shape.radius, Math.PI, 0, true);
    context.lineTo(0, 0);
    context.closePath();
    context.fill();
  }

  context.restore(); // Restore the context state to prevent the rotation affecting other shapes
}


// Function to update the shapes' positions
function updateShapes() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];

    // Update position
    shape.x += shape.dx;
    shape.y += shape.dy;

    // Calculate direction away from the cursor
    const dx = shape.x - mouseX;
    const dy = shape.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const directionX = dx / distance;
    const directionY = dy / distance;

    // Update velocities based on cursor proximity
    if (distance < 100) {
      shape.dx += directionX * 0.2; 
      shape.dy += directionY * 0.2; 
    }

    // Handle collisions with canvas boundaries
    if (shape.x + shape.radius > canvas.width) {
      shape.x = canvas.width - shape.radius;
      shape.dx = -shape.dx;
    } else if (shape.x - shape.radius < 0) {
      shape.x = shape.radius;
      shape.dx = -shape.dx;
    }

    if (shape.y + shape.radius > canvas.height) {
      shape.y = canvas.height - shape.radius;
      shape.dy = -shape.dy;
    } else if (shape.y - shape.radius < 0) {
      shape.y = shape.radius;
      shape.dy = -shape.dy;
    }

    // Update rotation angle
    shape.angle += shape.angularVelocity;

    // Draw shape
    drawShape(shape);
  }

  requestAnimationFrame(updateShapes);
}

// Mouse move event listener
canvas.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Create initial shapes
for (let i = 0; i < 50; i++) {
  const shape = createRandomShape();
  shapes.push(shape);
}

// Start animation
updateShapes();


  
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

// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

const staticCanvas = document.getElementById('static');
const staticCtx = staticCanvas.getContext('2d');

staticCanvas.width = window.innerWidth;
staticCanvas.height = window.innerHeight;

// Function to draw static
function drawStatic() {
  // Create ImageData object
  const imageData = staticCtx.createImageData(staticCanvas.width, staticCanvas.height);
  
  // Loop through every pixel
  for (let i = 0; i < imageData.data.length; i += 4) {
    // Generate a random grayscale color
    const color = Math.random() * 255;
    
    // Set pixel color
    imageData.data[i] = color;     // Red
    imageData.data[i + 1] = color; // Green
    imageData.data[i + 2] = color; // Blue
    imageData.data[i + 3] = Math.random() > 0.95 ? 0 : 20; // Alpha
  }
  
  // Draw image data to the canvas
  staticCtx.putImageData(imageData, 0, 0);
}

// Function to update static
function updateStatic() {
  drawStatic();
  
  // Continue updating static
  requestAnimationFrame(updateStatic);
}

// Start updating static
updateStatic();

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

