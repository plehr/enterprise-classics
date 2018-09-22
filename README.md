
# enterprise-classics
Dockerized API to add and display classic enterprise decisions you won't go with.

## Build
````Bash
docker build -t enterprise-classics .
````

## Create Volume for Database File
````Bash
docker volume create enterprise-classics
````

## Run
````Bash
docker run -d -v enterprise-classics:/app/data -p 8080:3000 enterprise-classics
````

or use ready builds from Dockerhub:
````Bash
docker run -d -v /<insert your local data dir. Example: /data>:/app/data -p 8080:3000 plehr/enterprise-classics
````

## UI
You can access the UI: ``http://[docker-host]:8080/ui``

 *Database is empty by default. You must HTTP POST an entry.*

````Bash
curl --request POST --url http://[docker-host]:8080/ --header 'content-type: application/json'--data '{"title":"Title", "text":"Text"}'
````
