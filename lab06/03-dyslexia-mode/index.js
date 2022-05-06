/* 
  See Smashing Magazine Tutorial:
  https://www.smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/
*/

const wasPressed = window.localStorage.getItem("dyslexic") === "true"; 
if (wasPressed) { // if the user left website with dyslexic toggled
  document.querySelector("body").setAttribute("class", "dyslexia-mode"); // start with the website in dyslexia-mode
}

const toggleDyslexiaMode = () =>
{
  body = document.querySelector("body");

  isDyslexic = body.className; // a string, but gets evaluated in the if as true/false
  if (isDyslexic) { body.removeAttribute("class"); }
  else { body.className = "dyslexia-mode"; }
  isDyslexic = !isDyslexic; // now a boolean: if previously evaluated as false, now true (and vice-versa)

  window.localStorage.setItem("dyslexic", String(isDyslexic))
}

document.querySelector("#dyslexia-toggle").addEventListener("click", toggleDyslexiaMode);