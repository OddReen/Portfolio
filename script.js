function copyToClipboard(elementId) {
  const textToCopy = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    // Find the button that triggered the copy action
    const button = document.querySelector(`#${elementId}`).nextElementSibling;

    // Create a tooltip element
    const tooltip = document.createElement('span');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = 'Copied!';
    button.appendChild(tooltip);

    // Remove the tooltip after 2 seconds
    setTimeout(() => {
      tooltip.remove();
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}

document.querySelectorAll('.copy-button').forEach(button => {
  button.addEventListener('click', () => {
    const elementId = button.previousElementSibling.id;
    copyToClipboard(elementId);
  });
});

function goToLink(url) {
  window.open(url, '_blank'); // Opens the link in a new tab
}

function showCategory(categoryId) {
  // Hide all categories
  document.querySelectorAll('.project-category').forEach(category => {
    category.classList.remove('active');
  });

  // Remove active class from all buttons
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
  });

  // Show the selected category
  document.getElementById(categoryId).classList.add('active');

  // Highlight the corresponding button
  document.querySelector(`.tab-button[onclick="showCategory('${categoryId}')"]`).classList.add('active');
}

const wrapper = document.querySelector('.scrollable-wrapper');
const panes = document.querySelectorAll('.pane');
const dots = document.querySelectorAll('.dot');
const paneCount = panes.length;
let currentPane = 0;

// Scroll to a specific pane (with arrow navigation)
function scrollPane(direction) {
  currentPane = (currentPane + direction + paneCount) % paneCount; // Wrap around using modulo
  updatePane();
}

// Jump to a specific pane
function jumpToPane(index) {
  currentPane = index;
  updatePane();
}

// Update the active pane and dot indicators
function updatePane() {
  const offset = currentPane * wrapper.offsetWidth;
  wrapper.scrollTo({ left: offset, behavior: 'smooth' });

  // Update active dot
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentPane);
  });
}

// Disable wheel scroll inside the wrapper
wrapper.addEventListener('wheel', (e) => {
  if (e.deltaY !== 0) {
    // Allow vertical scrolling
    return;
  }
  e.preventDefault(); // Prevent horizontal scrolling
});

const sections = document.querySelectorAll('section'); // Select all sections
const navLinks = document.querySelectorAll('.nav-link'); // Select all nav links

function highlightNavLink() {
  let currentSection = '';

  // Loop through sections to find the one in the middle of the viewport
  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top; // Distance from the top of the viewport
    const sectionHeight = section.offsetHeight;

    // Check if the middle of the viewport is within the section
    if (sectionTop <= window.innerHeight / 2 && sectionTop + sectionHeight >= window.innerHeight / 2) {
      currentSection = section.getAttribute('id'); // Get the section's ID
    }
  });

  // Remove 'active' class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active'); // Add 'active' class to the current link
    }
  });
}

// Add scroll event listener
window.addEventListener('scroll', highlightNavLink);