const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const applyButton = document.getElementById('apply');
const percentageInput = document.getElementById('percentage');
const shapeSelector = document.getElementById('shape');
const percentageLabel = document.getElementById('percentage-label');
const resultDiv = document.getElementById('result');

// Funciones para dibujar figuras geométricas
function drawRectangle(percentage) {
  const rectX = 50;
  const rectY = 50;
  const rectWidth = 400;
  const rectHeight = 200;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

  if (percentage !== null) {
    const shadedHeight = (rectHeight * percentage) / 100;
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(rectX, rectY + rectHeight - shadedHeight, rectWidth, shadedHeight);
  }
}

function drawSquare(percentage) {
  const squareSize = 200;
  const squareX = (canvas.width - squareSize) / 2; // Centrando el cuadrado
  const squareY = (canvas.height - squareSize) / 2; // Centrando el cuadrado

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(squareX, squareY, squareSize, squareSize);

  if (percentage !== null) {
    const shadedHeight = (squareSize * percentage) / 100;
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(squareX, squareY + squareSize - shadedHeight, squareSize, shadedHeight);
  }
}

function drawCircle(percentage) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();

  if (percentage !== null) {
    const endAngle = (Math.PI * 2 * percentage) / 100;
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, endAngle);
    ctx.closePath();
    ctx.fill();
  }
}

// Actualiza el texto del label según la figura seleccionada
function updateLabel(shape) {
  const shapeNames = {
    rectangle: 'rectángulo',
    square: 'cuadrado',
    circle: 'círculo',
  };
  percentageLabel.textContent = `¿Cuánto por ciento del área del ${shapeNames[shape]} desea sombrear?`;
}

// Muestra el resultado del porcentaje sombreado y no sombreado
function updateResult(shape, shadedPercentage) {
  const shapeNames = {
    rectangle: 'rectángulo',
    square: 'cuadrado',
    circle: 'círculo',
  };
  const unshadedPercentage = 100 - shadedPercentage;
  resultDiv.textContent = `El porcentaje del área del ${shapeNames[shape]} sombreada es ${shadedPercentage}%. El porcentaje no sombreado es ${unshadedPercentage}%.`;
}

// Maneja el evento de selección de figura
shapeSelector.addEventListener('change', () => {
  const shape = shapeSelector.value;

  // Actualiza la figura mostrada
  if (shape === 'rectangle') {
    drawRectangle(null);
  } else if (shape === 'square') {
    drawSquare(null);
  } else if (shape === 'circle') {
    drawCircle(null);
  }

  // Actualiza el texto del label
  updateLabel(shape);

  // Limpia el resultado
  resultDiv.textContent = '';
});

// Aplica el porcentaje ingresado
applyButton.addEventListener('click', () => {
  const percentage = parseFloat(percentageInput.value);

  if (isNaN(percentage) || percentage < 0 || percentage > 100) {
    alert('Por favor, ingresa un porcentaje válido (0-100)');
    return;
  }

  const shape = shapeSelector.value;

  if (shape === 'rectangle') {
    drawRectangle(percentage);
  } else if (shape === 'square') {
    drawSquare(percentage);
  } else if (shape === 'circle') {
    drawCircle(percentage);
  }

  // Actualiza el resultado
  updateResult(shape, percentage);
});

// Dibuja la figura inicial (rectángulo por defecto)
drawRectangle(null);