FROM lambci/lambda:build-nodejs8.10

COPY . /
WORKDIR /

RUN npm install --no-optional && npm cache clean -f

RUN npm run test

RUN npm run build
