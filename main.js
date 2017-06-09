const Deepstream = require( 'deepstream.io' ),
    RedisCacheConnector = require( 'deepstream.io-cache-redis' ),
    MongoDBStorageConnector = require( 'deepstream.io-storage-mongodb' ),
    url = require('url');

const redisUrl = url.parse(process.env.REDIS_URL);

const server = new Deepstream({port: process.env.PORT || 6020});

server.set( 'cache', new RedisCacheConnector( {
  port: redisUrl.port,
  host: redisUrl.hostname,
  password: redisUrl.auth.split(':')[1]
}));

server.set( 'storage', new MongoDBStorageConnector( {
  connectionString: process.env.MONGODB_URI,
  splitChar: '/'
}));

server.start();
