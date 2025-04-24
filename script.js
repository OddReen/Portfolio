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