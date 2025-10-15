# Commands

# Create a Docker Network
docker network create mongo-network

# Start mongodb
docker run -d ^
  --name mongo ^
  --network mongo-network ^
  -e MONGO_INITDB_ROOT_USERNAME=admin ^
  -e MONGO_INITDB_ROOT_PASSWORD=password ^
  -p 27017:27017 ^
  mongo

  # Start mongo-express
  docker run -d ^
  --name mongo-express ^
  --network mongo-network ^
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin ^
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password ^
  -e ME_CONFIG_MONGODB_SERVER=mongo ^
  -p 8081:8081 ^
  mongo-express
