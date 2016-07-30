#!/bin/bash

myDir="$(dirname "$0")"
source "${myDir}/_deploy.sh"

server=${1-'do-f'}
remoteRoot=/var/www/gedcc

deploy
