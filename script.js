document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Simulate submission
  document.getElementById('form-response').textContent = `Thank you, ${name}! Your message has been received.`;
  this.reset();
});