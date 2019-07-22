import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis);

let client: any;

try {
  client = redis.createClient();
  client.on('error', (err: any) => {
    console.log("redis connection error ", err);
  });
  client.on('ready', () => {
    console.log('redis client ready');
  });
  client.on('connect', () => {
    console.log('redis client connecting');
  });
} catch (err) {
  console.log('error in loading redis', err);
}

export const getRedisKey = async (key: string) => {
  try {
    const result = await client.getAsync(key);
    return result;
  } catch (err) {
    console.log(err, `Redis error in get key: ${key}`);
    return null;
  }
};

export const exSetRedisKey = (key: string, value: string, time: number) => {
  try {
    client.setex(key, time, value);
  } catch (err) {
    console.log(err, `Redis error in set key: ${key}`);
  }
};
