#!/bin/bash
export NVM_DIR="/.nvm"
[ -s "/.nvm/nvm.sh" ] && \. "/.nvm/nvm.sh"
cd /home/ec2-user/deploy
npm i .
yes | cp /home/ec2-user/deploy/expressAppDeploy.service /lib/systemd/system/expressAppDeploy.service
systemctl daemon-reload
systemctl stop expressApp
systemctl enable expressAppDeploy
systemctl restart expressAppDeploy