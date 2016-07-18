#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const fs = require('fs');
const c = require('colors');

function combine() {
  const out = `${__dirname}/data/all-activities.json`;
  const clubActivities = {};
  const athletes = new Set();
  let dataFiles = 0;

  // collect club activities from all data files
  for (const f of fs.readdirSync(__dirname + '/data/dumps').sort()) {
    dataFiles++;

    try {
      const activities = require(`${__dirname}/data/dumps/${f}`);
      for (const activity of activities) {
        clubActivities[activity.id] = activity;
        athletes.add(activity.athlete.id);
      }
    } catch (e) {
      console.error(`Unable to read data file "${f}"`);;
    }

  }

  // info
  console.log(c.cyan('Data files:\t\t') + dataFiles);
  console.log(c.cyan('Activities:\t\t') + _.values(clubActivities).length);
  console.log(c.cyan('Active athletes:\t') + athletes.size);

  // save to file
  fs.writeFileSync(out, JSON.stringify(clubActivities));
  console.log(c.cyan('File created:\t\t') + out);
}

combine();