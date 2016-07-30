#!/usr/bin/env bash

localRoot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/../.."

# find pem file
pemFile=$(find ${localRoot}/dev/deploy/*.pem | head -1)

# config
serverUser=root
remoteUser=www-data
rsyncOptions="-avz --delete --exclude=.DS_Store --exclude=*.local.* --exclude=resources/*.json --exclude=.git --exclude=node_modules/ --exclude=data/ --exclude=_private/"
sshOptions="-i ${pemFile} -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no"

function deploy {

  pushd ${localRoot}

  # set key file permissions
  chmod 0400 $pemFile

  # create dirs, set access rights, setup environment
  ssh ${sshOptions} -t ${serverUser}@${server} \
    "sudo mkdir -pv ${remoteRoot}"

  # sync files
  rsync ${rsyncOptions} -e "ssh ${sshOptions}" \
    ${localRoot}/* ${serverUser}@${server}:${remoteRoot}

  # post-sync scripts
  ssh ${sshOptions} -t ${serverUser}@${server} \
    "sudo chown -R $remoteUser:$remoteUser $remoteRoot"

  popd

}
