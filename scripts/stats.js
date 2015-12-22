'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const I = require('immutable');
const moment = require('moment');

const entries = I.fromJS(yaml.safeLoad(fs.readFileSync('./data/entries.yml', {encoding: 'utf-8'})));


const showCount = entries.size;

const artistCounts = entries.reduce((counts, entry) => {
  return entry.get('artists').reduce((counts, artist) => {
    return counts.update(artist, 0, (count) => count + 1);
  }, counts);
}, new I.Map());

const sortedCounts = artistCounts.sort().reverse();

const multipleShowBands = sortedCounts.filter((c) => c > 1).toJS();

function entriesBy(getter, opts) {
  opts = opts || {};
  const sorted = opts.sorted !== undefined ? opts.sorted : true;

  const grouped = entries
    .groupBy(getter)
    .map((v) => v.size);

    if (sorted) {
      return grouped.sort().reverse();
    } else {
      return grouped;
    }
}

const showsByVenue = entriesBy((entry) => entry.get('location')).toJS();

const showsByMonth = entriesBy((entry) => moment(entry.get('date')).format('MMMM'), {sorted: false}).reverse().toJS();

const showsByType = entriesBy((entry) => entry.get('type') || 'concert').toJS();

const stats = {
  showCount,
  multipleShowBands,
  showsByType,
  showsByVenue,
  showsByMonth,
};

fs.writeFileSync('./data/stats.yml', yaml.dump(stats), {encoding: 'utf-8'});
