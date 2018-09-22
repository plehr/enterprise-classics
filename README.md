# enterprise-classics
Dockerized API to add and display classic enterprise decisions you won't go with.


## Build
docker build -t enterprise-classics .

## Create Volume for Database File
docker volume create enterprise-classics

## Run
docker run -d -v enterprise-classics:/app/data -p 8080:3000 enterprise-classics
k