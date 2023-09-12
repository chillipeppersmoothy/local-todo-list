#stage1
FROM node:18.17.1 as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


#stage2
FROM nginx:alpine
COPY --from=build /app/docs/to-do-list-angular /usr/share/nginx/html