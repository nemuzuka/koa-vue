FROM node:10.14-alpine

RUN mkdir /app
COPY ./ /app

WORKDIR /app
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "start"]
