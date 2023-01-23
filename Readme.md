Adding docker files into the docker folder in the root of the project and then running it like

FROM node:17-alpine
WORKDIR /app
COPY ../ ./app
RUN npm install
CMD ["npm","start"]
EXPOSE 5001

docker build -t quoraapp:build_two ./Docker

Is not working.
