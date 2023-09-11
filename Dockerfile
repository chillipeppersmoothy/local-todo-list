#stage1
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


#stage2
FROM nginx:alpine
COPY --from=build /app/docs/to-do-list-angular /usr/share/nginx/html