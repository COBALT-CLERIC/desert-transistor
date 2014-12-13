'use strict';

var segments = 30; //30 secs as the width at every timeframe
var interval = 1000; //millesecond delay

var totalStudents=10;

// var setTotalStudent = function(num){
//   totalStudents = num;
//   console.log('set total = '+totalStudents);
// };

var now = new Date(Date.now());
var confusionCollection = [];
var confused = 0;

var images = ['img/kingsten.png', 'img/krystal.png', 'img/will.png', 
'img/ash.png', 'img/jon.png', 'img/charlie.png', 'img/Mario-icon.png', 'img/silvia.png'];

for (var i = 0, data = []; i < segments; i++) {
  data[i] = 0;
}

var margin = {
    top: 40,
    right: 40,
    bottom: 60,
    left: 40
  },
  width = document.body.offsetWidth - margin.right,
  height = document.body.offsetHeight - margin.top - margin.bottom;

var x = d3.time.scale()
  .domain([now - segments * interval, now])
  .range([0, width]);

var y = d3.scale.linear()
  .domain([0, totalStudents])
  .range([height, 0]);

var line = d3.svg.line()
  .interpolate('basis')
  .x(function(d, i) {
    return x(now - (segments - 1 - i) * interval);
  }) // calculate position once on posting!
  .y(function(d, i) {
    return y(d);
  });

var svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xAxis = svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + height + ')') // move to bottom of screen
  .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

/* adding y-axis*/
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(totalStudents / 20)
  .tickSize(-width, 0, 0);


svg.append('g')
  .attr("class", "y axis")
  .attr("transform", "translate( 10,  0)")
  .call(yAxis);

/* adding path */
var path = svg.append('g')
  .append('path')
  .attr('class', 'graphline')
  .datum(data);

/*adding square groups*/
var squareSize = height / totalStudents;
var globalY = height - squareSize;


var squares = svg.append('g')
  .attr('class', 'squares')
  .style('fill', 'steelblue');


var calculateConfusion = function(array) {


  if (array) {
    confusionCollection = array;
  }
  if (confusionCollection.length) {
    confused = Math.min(confusionCollection.map(function(confusionObj) {
      var elapsed = (new Date()) - (new Date(confusionObj.createdAt));
      return (elapsed < 3000) ? 1 : (3000 / elapsed);
    }).reduce(function(a, b) {
      return a + b;
    }), totalStudents);
  }
};

var xPerSec = width / interval * segments;
var squareTime = squareSize * xPerSec;
// console.log('time',squareTime);
//if the distance to 1st square is less than one squareSize, decrease y
var holder = [];

var clipId = 0;
var popSquare = function(student){
 // var xPos = timediff * xPerSec;
  clipId++;
  var xPos = width + margin.right + margin.left;
  var yPos = globalY;

  if (holder.length === 0) {
    yPos = globalY;
  } else if (holder.length === 1) {


    var timediff  = (new Date(student.createdAt).getTime() - new Date(holder[0]).getTime());
    if(timediff < squareTime/3){
      globalY -= squareSize;  
      yPos = globalY;   
    }else{

      globalY = height - squareSize;
      yPos = globalY;
    }
  }

  
  squares.append("image")
        .attr('class', 'square')
        .attr('xlink:href', images[Math.floor(Math.random()*images.length)])
        .attr("x", xPos)
        .attr("y", yPos)
        .attr("width", squareSize)
        .attr("height", squareSize);
       

  holder.shift();
  holder.push(student.createdAt);
};

var isThresholdReached = function(array, threshold) {
  var a = document.getElementsByTagName("audio")[0];

  //change background color of screen if confused score is greater than threshold
  if (confused > 5) {
    //play audio ding
    a.play();
    $('body').animate({
      background: 'indianred'
    }, 'slow');
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

  // slide the x-axis left
  xAxis.call(x.axis)
    .selectAll('text')
    .attr('y', 10)
    .attr('transform', 'rotate(45)')
    .style('text-anchor', 'start');

  //redraw the line
  path
    .attr('d', line)
    .attr('transform', null);

  //  slide the line left
  path.transition()
    .duration(interval)
    .ease('linear')
    .attr('transform', 'translate(' + x(now - (segments - 1) * interval) + ')')
    .each('end', update);

  // pop the old data point off the front
  data.shift();

  d3.selectAll('image').transition()
    .duration(interval * segments * 2)
    .ease('linear')
    .attr('transform', 'translate(' + (-width * 2.2) + ', 0)')
    .each('end', update);

}
update();

$(document).ready(function() {
  $('body').on('click', '#confused', function(event) {
    event.preventDefault();
    $('#confused-icon').addClass('animated shake')
      .delay(1000)
      .queue(function(next) {
        $('#confused-icon')
          .removeClass('animated shake')
        next();
      });
    
      $('#confused').fadeOut(400, function() {
        $('#confused').fadeIn(10000)
        
    
    });
  });
});