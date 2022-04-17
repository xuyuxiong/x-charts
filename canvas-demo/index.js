const data = [
  { name: 'questions', value: 11 },
  { name: 'schools', value: 17 },
  { name: 'philosopers', value: 35 },
];

const chartWidth = 480;
const chartHeight = 300;
const margin = 15;

const containerWidth = chartWidth + margin * 2;
const containerHeight = chartHeight + margin * 2;

const names = Array.from(data, (d) => d.name);
const values = Array.from(data, (d) => d.value);
const indices = Array.from(data, (_, i) => i);
// 每一个条的左下顶点的横坐标
const step = chartWidth / names.length;
const barWidth = step * 0.8;
const xs = Array.from(indices, (i) => i * step);
// 每一个条的左下顶点的纵坐标
// 因为所有条底部都是对齐的，所以就是图表的高度
const y = chartHeight;

// 映射： 布局完成之后就来到了映射过程。这里我们需要把数据的 value 属性映射为条的高度，需要把数据的 name 属性映射为条的颜色
// 获得每一个条的高度
// 条的高度应该和 value 线性相关的
const vmax = Math.max(...values);
const barHeights = Array.from(values, (v) => chartHeight * (v / vmax));

// 获得每一个条的颜色
const nameColor = {
  questions: '#5B8FF9',
  philosopers: '#61DDAA',
  schools: '#65789B',
};

const colors = Array.from(names, (name) => nameColor[name]);

// 绘制视觉元素
const canvas = document.getElementById('container-canvas');
canvas.style.width = `${containerWidth}px`;
canvas.style.height = `${containerHeight}px`;

// 下面把画布宽高设置为样式宽高的两倍主要是为了解决模糊问题
// 这个地方就不详细展开了，感兴趣的可以自行查阅
canvas.width = containerWidth * 2;
canvas.height = containerHeight * 2;

const context = canvas.getContext('2d');
context.scale(2, 2); // 抵消将画布宽高设置为样式宽高两倍的影响

context.translate(margin, margin); // 将坐标原点移动到绘制图表的区域

console.log('indices', indices);

indices.forEach((index) => {
  // 将需要绘制的属性取出来
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];
  // 绘制条
  context.fillStyle = color;
  context.fillRect(x, y - barHeight, barWidth, barHeight);

  // 绘制值
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = 'white';
  context.font = '25px PingFangSC-Regular, sans-serif';
  context.fillText(value, x + barWidth / 2, y - barHeight / 2);
});
