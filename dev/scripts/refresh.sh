#!/usr/bin/env bash

localRoot="$(cd "$( dirname "${BASH_SOURCE[0]}" )/../.." && pwd )"

killall firefox

${localRoot}/crawler/src/app.js get-athletes -d
${localRoot}/crawler/src/app.js get-activities -dD

cp -f ${localRoot}/crawler/data/athletes.json ${localRoot}/web-app/src/web/resources/
cp -f ${localRoot}/crawler/data/activities.json ${localRoot}/web-app/src/web/resources/

# backup files
backupDir="/var/log/gedcc-back/$(date +%F_%T)"
mkdir -pv ${backupDir}
cp -v ${localRoot}/web-app/src/web/resources/*.* ${backupDir}

killall firefox