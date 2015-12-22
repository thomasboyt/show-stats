'use strict';

const fs = require('fs');
const moment = require('moment');
const yaml = require('js-yaml');

let entries = yaml.safeLoad(fs.readFileSync('../loudplaces.disco.zone/_entries.yml', {encoding: 'utf-8'}));

entries.forEach((entry) => {
  delete entry.media;
  delete entry.audio;
  delete entry.body;
  entry.artists = entry.title.split('/').map((artist) => artist.trim());
  entry.date = moment(entry.date, 'YYYY-MM-DD').toDate();
  delete entry.title;
});

entries = entries.filter((entry) => entry.date.getFullYear() === 2015);

fs.writeFileSync('./data/entries.yml', yaml.dump(entries), {encoding: 'utf-8'});
