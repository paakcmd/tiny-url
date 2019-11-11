### To install RUN ###

RUN npm install

### To Start RUN ###

RUN npm start


### To run docker on mac and ubuntu ###

RUN chmod +x runDocker.sh
RUN ./runDocker

### To setup machine to run this project ###

1. RUN brew install awscli

inside the project directory

# AWS Elastic beanstalk

2. RUN aws configure

3. RUN eb init

4. RUN eb create

5. RUN eb deploy

### To expose logs ###

RUN chmod +x showLogs.sh
RUN ./showLogs.sh
