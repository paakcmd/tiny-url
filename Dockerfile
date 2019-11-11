FROM node:8-alpine

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

COPY . .
RUN npm install --production
RUN if [ -d "logs" ]; then rm -r logs; fi

RUN mkdir logs

RUN npm test

EXPOSE 8081

ADD     docker-entrypoint.sh    /entrypoint.sh
RUN     chmod +x /entrypoint.sh
ENTRYPOINT  ["/entrypoint.sh"]

CMD ["start"]