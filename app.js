const grid = document.getElementById("grid");
const draw = document.getElementById("draw");
const rainbow = document.getElementById("rainbow");
const colorPicker = document.getElementById("colorPicker");
const erase = document.getElementById("erase");
const clear = document.getElementById("clear");
const slider = document.getElementById("slider");
const size = document.getElementById("size");

let currentTool = "pen";
let currentColor = "#000000";
let currentSize = 32;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Tool selection
draw.addEventListener("click", () => {
  currentTool = "pen";
  draw.classList.add("active");
  rainbow.classList.remove("active");
  erase.classList.remove("active");
});
rainbow.addEventListener("click", () => {
  currentTool = "rainbow";
  rainbow.classList.add("active");
  draw.classList.remove("active");
  erase.classList.remove("active");
});
erase.addEventListener("click", () => {
  currentTool = "eraser";
  erase.classList.add("active");
  draw.classList.remove("active");
  rainbow.classList.remove("active");
});

function createGrid(size) {
  grid.innerHTML = "";
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const unit = document.createElement("div");
    grid.appendChild(unit);
    unit.addEventListener("mouseover", changeColor);
    unit.addEventListener("mousedown", changeColor);
  }
}

function changeColor(event) {
  if (event.type === "mouseover" && !mouseDown) return;
  if (currentTool === "pen") {
    event.target.style.backgroundColor = currentColor;
  } else if (currentTool === "eraser") {
    event.target.style.backgroundColor = "white";
  } else if (currentTool === "rainbow") {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    event.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
  }
}

// Grid size slider
size.innerHTML = `${slider.value} x ${slider.value}`;
slider.addEventListener("click", () => {
  size.innerHTML = `${slider.value} x ${slider.value}`;
  currentSize = slider.value;
  createGrid(currentSize);
});

// Clear
clear.addEventListener("click", () => {
  createGrid(currentSize);
});

// Color Picker
colorPicker.addEventListener("input", (event) => {
  currentColor = event.target.value;
});

window.onload = () => {
  createGrid(currentSize);
  draw.classList.add("active");
};
