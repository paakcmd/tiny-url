### To install RUN ###

RUN npm install

### To Start RUN ###

RUN npm start


### To run docker on mac and ubuntu ###

RUN chmod +x runDocker.sh
RUN ./runDocker
# inside dockerfile have npm test command
# build will be success only when test passes


### To setup machine to run this project ###

1. RUN brew install awscli

inside the project directory

# AWS Elastic beanstalk

2. RUN aws configure

3. RUN eb init

# Make sure you set aws up codeCommit

4. RUN eb create

5. RUN eb deploy

# when you run eb deploy, it will push code from local to AWS CodeCommit and will trigger docker build on Elastic Beanstalk and deploy to managed instance
# when docker build is executed the test will also run.

### To expose logs ###

RUN chmod +x showLogs.sh
RUN ./showLogs.sh

## Inside the code, there are commands to write logs to console which will appear inside Elastic Beanstalk log system and you can request logs from console as well.

## This is not the best solution. We better install Firebeat to push logs inside dockers to Logstash and use Elastic Search and Kibana to show logs.


### To run test ###

RUN npm test
