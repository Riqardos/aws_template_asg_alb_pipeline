# AWS infrastructure template

# Architecture
![](architecture.png)

### Alarms for ASG
- CPU load > 50% -> add instance
- CPU load < 25% -> remove instance


# Prerequisites
- [aws cli](https://aws.amazon.com/cli/)

# Usage
- You have to create/download from AWS EC2 key (for SSH access), a set parameter `KeyName` in .yaml

### Infrastructure deploy
`aws cloudformation deploy --template .\cloudFormation-autoscaling.yml.yml --myInfra --parameter-overrides KeyName=rk-key-pair`

### Infrastructure deletion
`aws cloudformation delete-stack --stack-name myInfra`


# About image
AmiID: ami-0f121ce69f9e67382

In image is running simple express.js web server, which servers following endpoints:
- /api - shows hostname and uptime
- /kill - kills application
- /fibo?number=49 - calculates fibo number (makes CPU load)

Application is running as a service

Service
```
[Unit]
Description=LTPS NodeJS Test Application
After=network-online.target

[Service]
Restart=on-failure
WorkingDirectory=/
ExecStart=/.nvm/versions/node/v16.8.0/bin/node /home/ec2-user/expressApp/app.js

[Install]
WantedBy=multi-user.target
```

# Load performance
To test load, download [jMeter](https://jmeter.apache.org/) and import `LoadTests.jmx` file
Then set URL path (see ALB dns) and click green run button. In `View results tree` tab  you can see response messages.

![](jmeter.png)
