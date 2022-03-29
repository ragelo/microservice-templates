FROM node:16-alpine as base
WORKDIR /source

ADD package.json package-lock.json ./
RUN npm ci

FROM base as build-stage

ADD . /source
RUN npm run build

# stage 2
FROM base as server
COPY --from=base /source/package.json /source/package.json
COPY --from=build-stage /source/src/graphql/schema /source/graphql
COPY --from=build-stage /source/proto /source/proto
COPY --from=build-stage /source/dist /source/dist

CMD ["npm", "run", "start:prod"]
