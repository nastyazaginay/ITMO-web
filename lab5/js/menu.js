window.onload = function() {
  var currentURL = window.location.pathname.split('/').pop();
  var activeLink = document.getElementById(currentURL);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}
