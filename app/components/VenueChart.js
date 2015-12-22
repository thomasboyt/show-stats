import React from 'react';
import ReactDOM from 'react-dom';

import I from 'immutable';
import d3 from 'd3';

import textWrap from '../util/d3TextWrap';

const width = 750;
const height = 650;
const radius = 250;

const color = d3.scale.ordinal()
  .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

const VenueChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
  },

  getData() {
    const raw = I.fromJS(this.props.data);

    let data = raw.reduce((acc, [venue, count]) => {
      if (count > 1) {
        return acc.push([venue, count]);
      } else {
        // add to other count
        return acc.update(0, ([k, v]) =>[k, v + 1]);
      }
    }, I.List([['Other', 0]]));

    // move Other to the end of the list so that it ends up as the last entry in pie chart
    // (looks nicer that way...)
    data = data.splice(0, 1).concat([data.first()]);

    return data.toJS();
  },

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    this.renderPie(el);
  },

  renderPie(el) {
    const data = this.getData();

    const arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const labelArc = d3.svg.arc()
      .outerRadius(radius + 40)
      .innerRadius(radius + 40);

    const pie = d3.layout.pie()
      .sort(null)
      .value((entry) => entry[1]);

    const svg = d3.select(el).append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
        .attr('class', 'arc');

    g.append('path')
      .attr('d', arc)
      .style('fill', (d) => color(d.data[0]));

    g.append('text')
      .text(({data}) => `${data[0]} (${data[1]})`)
      .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .call(textWrap, 100);
  },

  render() {
    return (
      <div />
    );
  }
});

export default VenueChart;
