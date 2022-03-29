# Microservices example GraphQL Federation + gRPC

- For FrontEnd (public access) export GraphQL API implemented with Apollo Federation (as `api-gateway` service)
- For cross-service access use gRPC interface
- Each service has Dockerfile to build image
- Each service has Helm chart to package app specs for Kubernetes
- As local pipeline use Skaffold - build images, push them to your docker registry and deploy helm charts to cluster
    - build and push: `skaffold build -d <registry-name>`
    - deploy: `skaffold run -d <registry-name>`

# TODOs
- Add NextJS frontent to communicate with `api-gateway`
- Split this repo into multiple repositories to have production-ready style
- Configure AgroCD
- Configure multi-environment setup
- Configure configuration injectors (for example GQL and gRPC urls of services)
- Add MongoDB (helm chart) to `user-microservice`
- Add authentication middleware to `api-gateway` and send `X-GRAPHQL-AUTHENTICATED-USER` header to all upstream services (`user-service`, `contry-service`)
- Allow only authorized users to have ability to read list of all users
- Add integration tests for each service
- Configure Continious Deployment pipeline to promote environments from dev to staging to production
