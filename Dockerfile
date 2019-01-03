FROM node:latest
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install

ARG SECURE_MODE

ENV SECURE_MODE ${SECURE_MODE}

EXPOSE 3002

CMD ["node", "/usr/src/app/lib/app.js"]
