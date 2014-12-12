'use strict';

var segments = 30;
var interval = 1000; //millesecond delay
var totalStudents = 60;
var now = new Date(Date.now());
var confusionCollection = [];
var confused = 0;

for (var i = 0, data = []; i < segments; i++) {
    data[i] = 0;
}

var margin = {top: 20, right: 20, bottom: 20, left: 20},
  width = document.body.offsetWidth - margin.right,
  height = document.body.offsetHeight - margin.top - margin.bottom;

var x = d3.time.scale()
  .domain([now - segments * interval, now])
  .range([0, width]);

var y = d3.scale.linear()
  .domain([0,totalStudents])
  .range([height, 0]);

var line = d3.svg.line()
  .interpolate('basis')
  .x(function(d, i) { return x(now - (segments - 1 - i) * interval); }) // calculate position once on posting!
  .y(function(d, i) { return y(d); });

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var axis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')') // move to bottom of screen
  .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

var path = svg.append('g')
    .append('path')
    .attr('class','graphline')
    .datum(data);

var calculateConfusion = function(array){
    if (array) {
      confusionCollection = array;
    }
    if (confusionCollection.length){
      confused = Math.min(confusionCollection.map(function(confusionObj) {
        var elapsed = (new Date()) - (new Date(confusionObj.createdAt));
        // console.log(elapsed)
        return (elapsed < 3000) ? 1 : (3000/elapsed);
      }).reduce(function(a, b) {
        return a + b;
      }), totalStudents);
    }
};

var isThresholdReached = function(array, threshold){
  var a = document.getElementsByTagName("audio")[0];
  
  //change background color of screen if confused score is greater than threshold
  if (confused > 5) {
    //play audio ding
    a.play();
    $('body').animate({background: 'indianred'}, 'slow');
  };
}

function update() {
  // update the domains
  now = new Date();
  x.domain([now - (segments - 2) * interval, now - interval]);
  // y.domain([0, d3.max(data)]);

  // push the accumulated confused onto the back, and reset the confused
  calculateConfusion();
  data.push(confused);
  // console.log(confused);

  // redraw the line
  path
    .attr('d', line)
    .attr('transform', null);

  // slide the x-axis left
  axis.call(x.axis)
    .selectAll('text')
      .attr('y',10)
      .attr('transform', 'rotate(45)')
      .style('text-anchor', 'start');

  // slide the line left
  path.transition()
    .duration(interval)
    .ease('linear')
    .attr('transform', 'translate(' + x(now - (segments - 1) * interval) + ')')
    .each('end',update);

  // pop the old data point off the front
  data.shift();
}

update();
