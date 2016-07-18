#!/usr/bin/env bash

clubId="198722"
accessToken="ae0787f7c4183479dd0aca270e95e7629e02516e"
cmd="curl -G https://www.strava.com/api/v3/clubs/${clubId}/activities -d access_token=${accessToken}&per_page=200&page=1"
echo "Executing $cmd ..."
$cmd > "data/dumps/activities-$(date '+%Y%m%d_%H%M%S').json"