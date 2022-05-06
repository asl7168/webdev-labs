/*
    Hints: 
    1. Attach click event handlers to all four of the 
       buttons (#default, #ocean, #desert, and #high-contrast).
    2. Modify the className property of the body tag 
       based on the button that was clicked.
*/

const makeDefault = () => { document.querySelector("body").removeAttribute("class"); }
const makeOcean = () => { document.querySelector("body").className = "ocean"; }
const makeDesert = () => { document.querySelector("body").className = "desert"; }
const makeHighContrast = () => { document.querySelector("body").className = "high-contrast"; }


document.querySelector("#default").addEventListener("click", makeDefault);
document.querySelector("#desert").addEventListener("click", makeDesert);
document.querySelector("#ocean").addEventListener("click", makeOcean);
document.querySelector("#high-contrast").addEventListener("click", makeHighContrast);