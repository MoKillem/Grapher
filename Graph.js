// Create array of points and edges
verticesAndEdgesArray = formVerticesAndEdges(10);
var vertices = verticesAndEdgesArray[0] ;
var edgesMatrix = verticesAndEdgesArray[1];
const maxRandom = 800;
//visual elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var resetButton = document.getElementById("resetButton")
//function to randomise vertices/edges.
function formVerticesAndEdges(length){
  let vertices = [];
  let edgesMatrix = []
  for(let i = 0; i <= length; i++){
    let edges = []
    vertices.push(i.toString())
    for(let j = 0; j <= length; j++){
      edges.push(getRandomInt(1.999999))
    }
    edgesMatrix.push(edges)
  }
  return [vertices,edgesMatrix];
}
// random integer generator
function getRandomInt(max = maxRandom) {
  return Math.floor(Math.random() * max);
}
// for each vertix add it to graph object
function createGraph(verices,edgesMatrix){
  let graph = Object.create(null);
  let positionSet = []
  for(vertix in vertices){
    initialX = getRandomInt()
    initialY = getRandomInt()
    while(positionSet.includes([initialX,initialY])){
      initialX = getRandomInt()
      initialY = getRandomInt()
    }
    positionSet[vertix] = [initialX,initialY]
    graph[vertices[vertix]] = [edgesMatrix[vertix], [initialX,initialY]];
  };
  return graph;
}

//draw vertix function
function drawVertix(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = 'rgb('+getRandomInt(255) + ',' + getRandomInt(255) + ',' + getRandomInt(255) +')';
    ctx.stroke()
  }
}

var graph = createGraph(vertices,edgesMatrix)

function drawEdges(vertices, canvas, ctx, graph){
  console.log("run")
  // draw each vertix
  for(vertix in vertices){
    positions = graph[vertices[vertix]][1]
    edges = graph[vertices[vertix]][0]
    x_position = positions[0]
    y_position = positions[1]
    drawVertix(ctx, x_position,y_position, 5, 'yellow', 'green', 2)
    //condition ? exprIfTrue : exprIfFalse
    for(edge in edges){
      if(edges[edge]){
        edgePositions = graph[vertices[edge]][1]
        ctx.moveTo(x_position, y_position);
        ctx.lineTo(edgePositions[0], edgePositions[1]);
        ctx.stroke();

      }
    }
  }
}


// First initialisation
drawEdges(vertices,canvas,ctx,graph)

//button
resetButton.addEventListener("click", () => {
  drawEdges(vertices, canvas, ctx, graph)
})
