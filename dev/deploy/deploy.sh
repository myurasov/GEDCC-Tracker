#!/bin/bash

myDir="$(dirname "$0")"
source "${myDir}/_deploy.sh"

server=${1-'gedcc.yurasov.me'}
remoteRoot=/var/www/gedcc

deploy
