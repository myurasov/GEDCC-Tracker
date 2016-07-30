#!/usr/bin/env bash

localRoot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.."

killall firefox

${localRoot}/crawler/src/app.js get-athletes -d
${localRoot}/crawler/src/app.js get-activities -dD

cp -f ${localRoot}/crawler/data/athletes.json ${localRoot}/web-app/src/web/resources/
cp -f ${localRoot}/crawler/data/activities.json ${localRoot}/web-app/src/web/resources/

killall firefox