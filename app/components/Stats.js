import React from 'react';

import VenueChart from './VenueChart';

const Stats = React.createClass({
  propTypes: {
    stats: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <div>
        <VenueChart data={this.props.stats.showsByVenue} />
      </div>
    );
  }
});

export default Stats;
