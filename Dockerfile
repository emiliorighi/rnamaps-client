FROM node:latest as build-stage

WORKDIR /rnamaps-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine

#  copy the nginx.conf in our filesystem into the image filesystem
COPY default.conf.template /etc/nginx/templates/default.conf.template

COPY --from=build-stage /client/dist /usr/share/nginx/html

VOLUME [ "/statics" ]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
