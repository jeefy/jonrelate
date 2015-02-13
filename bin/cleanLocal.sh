docker rm $(docker kill $(docker ps -qa))
docker rmi $(docker images -qa)
