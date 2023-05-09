// Get the canvas element
const canvas = document.getElementById('areaChartCanvas');
const ctx = canvas.getContext('2d');

// Define the chart data
const lineChartData = [
  { date: '1', tileScore: 10 },
  { date: '2', tileScore: 7 },
  { date: '3', tileScore: 5 },
  { date: '4', tileScore: 4 },
  { date: '5', tileScore: 6 },
  { date: '6', tileScore: 4 },
  { date: '7', tileScore: 5 },
  { date: '8', tileScore: 8 },
  { date: '9', tileScore: 6 },
  { date: '10', tileScore: 8 },
  { date: '11', tileScore: 0 },
  { date: '12', tileScore: 1 },
  { date: '13', tileScore: 9 },
  { date: '14', tileScore: 9 },
  { date: '15', tileScore: 1 }
];

// Set up chart dimensions and margins
const width = canvas.width;
const height = canvas.height;
const margin = { top: 10, right: 60, left: 40, bottom: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Calculate the maximum and minimum values in the dataset
const maxTileScore = Math.max(...lineChartData.map(data => data.tileScore));
const minTileScore = Math.min(...lineChartData.map(data => data.tileScore));

// Set up the scales for x and y axes
const xScale = chartWidth / (lineChartData.length - 1);
const yScale = chartHeight / (maxTileScore - minTileScore);

// Draw the chart
ctx.clearRect(0, 0, width, height); // Clear the canvas

// Draw the x-axis
ctx.beginPath();
ctx.moveTo(margin.left, height - margin.bottom);
ctx.lineTo(width - margin.right, height - margin.bottom);
ctx.stroke();

// Draw the y-axis
ctx.beginPath();
ctx.moveTo(margin.left, margin.top);
ctx.lineTo(margin.left, height - margin.bottom);
ctx.stroke();

// Draw the y-axis markings
ctx.font = '12px Arial';
ctx.textAlign = 'right';
ctx.textBaseline = 'middle';
ctx.fillStyle = '#333';
const yAxisMarkings = [0, 3, 6, 10];
yAxisMarkings.forEach(mark => {
  const y = height - ((mark - minTileScore) * yScale) - margin.bottom;
  ctx.fillText(mark.toString(), margin.left - 10, y);
});

// Draw the area
ctx.fillStyle = 'rgba(71, 102, 249, 0.8)';
ctx.beginPath();
ctx.moveTo(margin.left, height - margin.bottom);
lineChartData.forEach((data, index) => {
  const x = margin.left + index * xScale;
  const y = height - ((data.tileScore - minTileScore) * yScale) - margin.bottom;
  ctx.lineTo(x, y);
});
ctx.lineTo(width - margin.right, height - margin.bottom);
ctx.lineTo(margin.left, height - margin.bottom);
ctx.closePath();
ctx.fill();

// Draw the line
ctx.strokeStyle = '#4766f9';
ctx.lineWidth = 2;
ctx.beginPath();

// ...

// Create the gradient
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, 'blue');  // Blue at the top
gradient.addColorStop(1, 'white'); // White at the bottom

// Draw the area
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.moveTo(margin.left, height - margin.bottom);
lineChartData.forEach((data, index) => {
  const x = margin.left + index * xScale;
  const y = height - ((data.tileScore - minTileScore) * yScale) - margin.bottom;
  ctx.lineTo(x, y);
});
ctx.lineTo(width - margin.right, height - margin.bottom);
ctx.lineTo(margin.left, height - margin.bottom);
ctx.closePath();
ctx.fill();

// ...

