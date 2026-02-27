# Multistage build for React application

# 1. build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. production stage using nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# remove default nginx config if necessary
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
