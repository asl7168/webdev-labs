const makeBigger = () => {
   let div = document.querySelector("div.content");
   let divFontSize = window.getComputedStyle(div, null).getPropertyValue('font-size');
   
   let h1 = document.querySelector("h1");
   let h1FontSize = window.getComputedStyle(h1, null).getPropertyValue('font-size');
   
   console.log(divFontSize)

   div.style.fontSize = (parseFloat(divFontSize) + 1) + "px";
   h1.style.fontSize = (parseFloat(h1FontSize) + 1) + "px";

};

const makeSmaller = () => {
   let div = document.querySelector("div.content");
   let divFontSize = window.getComputedStyle(div, null).getPropertyValue('font-size');
   
   let h1 = document.querySelector("h1");
   let h1FontSize = window.getComputedStyle(h1, null).getPropertyValue('font-size');
   
   console.log(divFontSize)

   div.style.fontSize = (parseFloat(divFontSize) - 1) + "px";
   h1.style.fontSize = (parseFloat(h1FontSize) - 1) + "px";
};


document.querySelector("button#a1").addEventListener('click', makeBigger);
document.querySelector("button#a2").addEventListener('click', makeSmaller);

