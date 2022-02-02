var cubeDimensions;
let ui = document.getElementById('properties-ui');
let sizeProperty = document.getElementById('size');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hideUI();
  }
});

document.addEventListener('click', (event) => {
  if (event.target === ui) hideUI();
})

function hideUI() {
  ui.style.display = "none";
}

function showUI() {
  ui.style.display = "block";
}

function setProperties() {  
  cube.reset();
  cubeDimensions =  sizeProperty.value;
  start();
  hideUI();
}