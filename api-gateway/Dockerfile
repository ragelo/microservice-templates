FROM node:16-alpine as base
WORKDIR /source

ADD package.json package-lock.json ./
RUN npm ci

FROM base as build-stage

ADD . /source
RUN npm run build

# stage 2
FROM base as server
COPY --from=build-stage /source/package.json /source/package.json
COPY --from=build-stage /source/dist /source/dist

CMD ["npm", "run", "start:prod"]
