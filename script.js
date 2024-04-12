
// Slideshow
let images = document.querySelectorAll("#slideshow img");
let currentImage = 0;

function slideshow() {
  images[currentImage].classList.remove("active");
  currentImage = (currentImage + 1) % images.length;
  images[currentImage].classList.add("active");
}

setInterval(slideshow, 3000); // Change image every 3 seconds
// End Slideshow

// Slideshow2
let imagesS = document.querySelectorAll("#slideshow-services img");
let currentImageS = 0;

function slideshowServices() {
  imagesS[currentImageS].classList.remove("active");
  currentImageS = (currentImageS + 1) % images.length;
  imagesS[currentImageS].classList.add("active");
}

setInterval(slideshowServices, 3200); // Change image every 3.2 seconds




// The function actually applying the offset
function offsetAnchor() {
    if(location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 125);// this sets the offsetAnchor so the resting place of the clicked nav item shows where it should
    }
}
// This will capture changes while on the page
window.addEventListener("hashchange", offsetAnchor);
// this sets the offsetAnchor so the resting place of the clicked nav item shows where it should
window.setTimeout(offsetAnchor, 1);

// About section text fadeout/in
$(document).ready(function() {
  var $p = $('div.about-container p.about-text1, div.about-container p.about-text2') // Select all <p> elements in the <div> with class 'container'
      i = 0; // Initialize a counter

  function cycle() {
      var $current = $p.eq(i); // Get current <p> element

      $current.fadeIn(1000, function() { // Fade in over 1 second
          $current.delay(6000).fadeOut(1000, function() { // Stay visible for 2 seconds, then fade out over 1 second
              i = ++i % $p.length; // Increment the counter cyclically
              cycle(); // Call the function recursively
          });
      });
  }

  cycle(); // Start the cycle
});
