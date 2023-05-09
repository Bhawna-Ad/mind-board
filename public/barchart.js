const canvas = document.getElementById('barGraphCanvas');
const ctx = canvas.getContext('2d');

// Define the chart data
const barChartData = [
  { category: 'Work', value: 5.7 },
  { category: 'Personal Health', value: 5 },
  { category: 'Friends', value: 4 },
  { category: 'Family', value: 1 },
  { category: 'Academics', value: 9 }
];

// Set up chart dimensions and margins
const width = canvas.width;
const height = canvas.height;
const margin = { top: 10, right: 10, bottom: 40, left: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Calculate the maximum value in the dataset
const maxValue = Math.max(...barChartData.map(data => data.value));

// Set up the scale for the y-axis
const yScale = chartHeight / maxValue;

// Draw the chart
ctx.clearRect(0, 0, width, height); // Clear the canvas

// Draw the y-axis
ctx.beginPath();
ctx.moveTo(margin.left, margin.top);
ctx.lineTo(margin.left, height - margin.bottom);
ctx.stroke();

// Draw the y-axis markings
ctx.font = '12px Arial';
ctx.textAlign = 'center';
ctx.fillStyle = '#333';
ctx.fillText('0', margin.left - 10, height - margin.bottom + 15);
ctx.fillText('3', margin.left - 10, height - margin.bottom - (3 * yScale) + 15);
ctx.fillText('6', margin.left - 10, height - margin.bottom - (6 * yScale) + 15);
ctx.fillText('10', margin.left - 15, margin.top + 15);

// Calculate the spacing between bars
const barSpacing = 10;

// Calculate the adjusted bar width considering the spacing
const barWidth = (chartWidth - barSpacing * (barChartData.length - 1)) / barChartData.length;

// Draw the bars with spacing
barChartData.forEach((data, index) => {
  const x = margin.left + index * (barWidth + barSpacing);
  const y = height - (data.value * yScale) - margin.bottom;
  const barHeight = data.value * yScale;
  
  // Draw the bars
  ctx.fillStyle = 'rgba(71, 102, 249, 0.8)';
  ctx.fillRect(x, y, barWidth, barHeight);
});

// Draw the x-axis labels
ctx.font = '12px Arial';
ctx.fillStyle = '#333';
ctx.textAlign = 'center';
barChartData.forEach((data, index) => {
  const x = margin.left + index * (barWidth + barSpacing) + barWidth / 2;
  const y = height - margin.bottom + 20;
  ctx.fillText(data.category, x, y);
});
