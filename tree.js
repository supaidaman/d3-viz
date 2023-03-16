const margin = { top: 20, right: 90, bottom: 30, left: 90 };
const width = 600 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;
const nodeWidth = 100;
const nodeHeight = 100;
const linkWidth = 10;
const duration = 750;

const treeLayout = d3.tree().size([height, width - 100]);

// Create a SVG canvas
const svg = d3.select('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', `translate(${margin.left},${margin.top})`);

d3.json("data.json").then(data => {
	const rootNode = d3.hierarchy(data);
	const links = treeLayout(rootNode).links();
	const nodes = rootNode.descendants();

	const link = svg.selectAll(".link")
		.data(links)
		.join("path")
		.attr("class", "link")
		.attr("fill", "none")
		.attr("stroke", "#555")
		.attr("stroke-opacity", 0.4)
		.attr("stroke-width", 1.5)
		.attr("d", d3.linkVertical()
			.x(d => d.x)
			.y(d => d.y));

	const node = svg.selectAll(".node")
		.data(nodes)
		.join("g")
		.attr("class", "node")
		.attr("transform", d => `translate(${d.x},${d.y})`);

	node.append("rect")
		.attr("width", 40)
		.attr("height", 20)
		.attr("fill", "#ddd")
		.attr("stroke", "#555")
		.attr("stroke-width", 1.5)
		.attr("transform", "translate(-20,-10)");

	node.append("text")
		.attr("dy", ".35em")
		.attr("x", 0)
		.attr("text-anchor", "middle")
		.text(d => d.data.name);
}).catch(error => {
	console.error(error);
});
