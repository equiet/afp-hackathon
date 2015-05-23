function render() {


  // Data ================

  var dataset = [
    {
      totalRevenue: 6700000,
      govRevenue: 5500000,
      year: 2009
    },
    {
      totalRevenue: 4000000,
      govRevenue: 3500000,
      year: 2010
    },
    {
      totalRevenue: 4000000,
      govRevenue: 1500000,
      year: 2011
    },
    {
      totalRevenue: 5000000,
      govRevenue: 4500000,
      year: 2012
    },
    {
      totalRevenue: 4000000,
      govRevenue: 1500000,
      year: 2013
    },
    {
      totalRevenue: 4000000,
      govRevenue: 1500000,
      year: 2014
    }
  ];


  // Chart ================

  var margins = {top: 100, right: 100, bottom: 100, left: 40};
  var height = 400 - margins.top - margins.bottom,
      width = 800 - margins.left - margins.right,
      barPadding = 20,
      barWidth = 60;

  var chart = d3.select('.revenue')
    .attr('width', width + margins.left + margins.right)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');


  // Title ================

  var title = chart.append('text')
    .attr('class', 'title')
    .attr('y', -49)
    .text('Ročný obrat');

  var legendTotalRect = chart.append('rect')
    .classed('legend-total-revenue', true)
    .attr('width', 12)
    .attr('height', 12)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('y', -60)
    .attr('x', 110);

  var legendTotalText = chart.append('text')
    .attr('class', 'legend')
    .attr('y', -50)
    .text('z verejných zákaziek')
    .attr('x', 130);

  var legendGovRect = chart.append('rect')
    .classed('legend-gov-revenue', true)
    .attr('width', 12)
    .attr('height', 12)
    .attr('rx', 3)
    .attr('ry', 3)
    .attr('y', -60)
    .attr('x', 250);

  var legendGovText = chart.append('text')
    .attr('class', 'legend')
    .attr('y', -50)
    .text('zo štátnych zákaziek')
    .attr('x', 270);


  // Scales ================

  // Create a scale for the y-axis based on data
  var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) { return d.totalRevenue; })])
    .range([height, 0]);

  // Creates a scale for the x-axis based on city names
  var xScale = d3.scale.ordinal()
    .domain(dataset.map(function(d) { return d.year; }))
    .rangeRoundBands([0, width], 0.1);


  // X axis ================

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

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


  // Total revenue bars ================

  chart.selectAll('rect.total-revenue')
    .data(dataset)
    .enter()
      .append('rect')
      .classed('total-revenue', true)
      .attr('x', function(d, i) { return xScale(d.year) + 10; })
      .attr('y', function(d) { return yScale(d.totalRevenue); })
      .attr('width', barWidth)
      .attr('height', function(d) { return height - yScale(d.totalRevenue) + 10; })
      .attr('rx', 3)
      .attr('ry', 3);


  // Government revenue bars ================

  chart.selectAll('rect.gov-revenue')
    .data(dataset)
    .enter()
      .append('rect')
      .classed('gov-revenue', true)
      .attr('x', function(d, i) { return xScale(d.year) + 10 + 5; })
      .attr('y', function(d) { return yScale(d.govRevenue); })
      .attr('width', barWidth)
      .attr('height', function(d) { return height - yScale(d.govRevenue) + 10; })
      .attr('rx', 3)
      .attr('ry', 3);


  // Label ================

  chart.selectAll('text.revenue-label')
    .data(dataset)
    .enter()
      .append('text')
      .classed('revenue-label', true)
      .attr('x', function(d, i) { return xScale(d.year) + 10 + 5; })
      .attr('y', function(d) { return yScale(d.totalRevenue) - 10; })
      .attr('width', barWidth)
      .text(function(d, i) { return d3.format('s')(d.govRevenue) + '/' + d3.format('s')(d.totalRevenue); });

}

window.addEventListener('load', render);
