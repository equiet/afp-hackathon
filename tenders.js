function renderTenders(dataset) {

  // Chart ================

  var margins = {top: 100, right: 20, bottom: 100, left: 40};
  var height = 400 - margins.top - margins.bottom,
      width = 800 - margins.left - margins.right,
      barPadding = 20,
      barWidth = 10;

  var svg = d3.select('.tenders')
    .attr('width', width + margins.left + margins.right)
    .attr('height', height + margins.top + margins.bottom);

  var wrapper = svg.select('.wrapper')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

  var chart = wrapper.select('.chart');


  // Scales ================

  // Create a scale for the y-axis based on data
  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d.amount; })])
    .range([height, 0]);

  // Creates a scale for the x-axis based on city names
  var xScale = d3.scale.linear()
    .domain([new Date(2009, 1, 1), new Date(2015, 1, 1)])
    .range([0, width]);


  // X axis ================

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues([2009, 2010, 2011, 2012, 2013, 2014])
    .tickFormat(function(d) { return new Date(d).getFullYear(); });

  chart.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height + 10) + ')')
    .call(xAxis)
    .selectAll('g')
      .append('rect')
        .attr('width', width/dataset.length - 8)
        .attr('height', 3)
        .attr('dx', -width/dataset.length/2)
        .attr('rx', 3)
        .attr('ry', 3)
        .attr('transform', 'translate(' + (-width/dataset.length/2) + ', 20)');


  // Y axis ================

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .tickFormat(d3.format('s'))
    .tickSize(-width)
    .ticks(6);

  chart.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(-10, 0)')
    .call(yAxis)
    .selectAll('line')
      .attr('x1', 15);


  // Tenders ================

  chart.selectAll('circle.tender')
    .data(dataset)
    .enter()
      .append('rect')
      .classed('tender', true)
      .attr('x', function(d, i) { return xScale(d.date) + 10; })
      .attr('y', function(d) { return yScale(d.amount); })
      .attr('width', barWidth)
      .attr('height', function(d) { return height - yScale(d.amount) + 10; })
      .attr('rx', 3)
      .attr('ry', 3);


  // Label ================

  chart.selectAll('text.tender-amount')
    .data(dataset)
    .enter()
      .append('text')
      .classed('tender-amount', true)
      .attr('x', function(d, i) { return xScale(d.date) + 10 + 5; })
      .attr('y', function(d) { return yScale(d.amount) - 10; })
      .attr('width', barWidth)
      .text(function(d, i) { return d3.format('s')(d.amount); })
      .call(function() { return arguments; });


  // Periods ================

  wrapper.select('.periods')
    .attr('transform', 'translate(0, ' + (height + 0) + ')');

  var frameStart = new Date(2009, 1, 1),
      frameEnd = new Date();

  var periods = [
    {
      start: frameStart,
      end: new Date(2010, 07, 09),
      label: 'Vláda R. Fica'
    },
    {
      start: new Date(2010, 07, 09),
      end: new Date(2012, 04, 04),
      label: 'Vláda I. Radičovej'
    },
    {
      start: new Date(2012, 04, 04),
      end: new Date(),
      label: 'Vláda R. Fica'
    }
  ];

  wrapper.selectAll('.periods rect')
    .data(periods)
    .attr('width', function(d, i) { return (d.end - d.start) / (frameEnd - frameStart) * 730; })
    .attr('x', function(d, i) { return (d.start - frameStart) / (frameEnd - frameStart) * 730; });

  wrapper.select('.periods').append('rect')
    .attr('class', 'overlay')
    .attr('width', 730)
    .attr('height', 22)
    .attr('rx', 3)
    .attr('ry', 3);

  wrapper.selectAll('.periods text')
    .data(periods)
    .attr('x', function(d, i) {
      var start = (d.start - frameStart) / (frameEnd - frameStart),
          length = (d.end - d.start) / (frameEnd - frameStart);
      return (start + length/2) * 730;
    });

}