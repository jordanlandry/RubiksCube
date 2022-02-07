// Turn the cube
document.addEventListener('keydown', async (event)  =>{
  scrambleSequence = generateScramble();
  if (event.code === 'Space') await turn(scrambleSequence);
});


// Move the mouse to change the rotation of the cube
let mouseDown = 0;
document.addEventListener('mousedown', (event) => {
  if (event.button === 0) mouseDown = 1;
})

document.addEventListener('mouseup', (event) => {
  mouseDown = 0;
  document.body.style.cursor = "default";
  xMousePos = 10;
})

document.addEventListener('mousemove', (event) => {
  if (mouseDown === 1) {
    document.body.style.cursor = "none";
    let dx = event.clientX - prevX;
    let dy = event.clientY - prevY;
    
    cubeMesh.rotation.y += dx / 314;
    cubeMesh.rotation.x += dy / 314;
  } 
  
  prevX = event.clientX;
  prevY = event.clientY;
})

document.addEventListener('mousewheel', (event) => {
  if (event.wheelDeltaY > 0) cubeMesh.position.z += 1;
  else if (event.wheelDeltaY < 0) cubeMesh.position.z -= 1;
})
