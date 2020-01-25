import redis from 'redis'
const client = redis
  .createClient()
  .on('connect', () => console.log('Redis connected'))
  .on('error', err => {
    console.error('Redis error on ' + new Date().toLocaleString())
    console.error(err)
  })

export default {
  incrementBy: (key: string, value = 1) => client.incrby(key, value),
  hgetall: (key: string) => client.hgetall(key),
  hmget: (key: string, field: string[]) => client.hmget(key, field),
  hmset: (
    key: string,
    value:
      | string
      | number
      | {
          [key: string]: string | number
        }
      | (string | number)[]
  ) => client.hmset(key, value),
  incr: (table: string, key: string, value = 1) => client.zincrby(table, value, key),
  getTop: (table: string, count = 5) => client.zrevrange(table, 0, count - 1, 'WITHSCORES'),
  getRange: (table: string, min: number, max: number) => client.zrevrange(table, min, max, 'WITHSCORES'),
  zscore: (table: string, id: string) => client.zscore(table, id),
  getXP: (table: string, id: string) => client.zscore(table, id),
  getRank: (table: string, id: string) => client.zrevrank(table, id),
  sadd: (table: string, value: string | string[]) => client.sadd(table, value),
  del: (table: string | string[]) => client.del(table),
  client
}
