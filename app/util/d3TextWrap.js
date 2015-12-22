import d3 from 'd3';

export default function wrap(text, width) {
  text.each(function() {
    const text = d3.select(this);
    const words = text.text().split(/\s+/);
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy')) || 0;

    const lineHeight = 1.1;  // ems

    let tspan = text.text(null).append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('dy', `${dy}em`);

    let line = [];
    let lineNumber = 0;

    words.forEach((word) => {
      line.push(word);

      tspan.text(line.join(' '));

      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        lineNumber += 1;

        tspan = text.append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', `${lineHeight + dy}em`)
          .text(word);
      }
    });
  });
}
