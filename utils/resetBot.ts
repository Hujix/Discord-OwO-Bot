/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */
import redis from 'redis'
const pub = redis.createClient()

/** Sends a request on pubsub to the 'endProcess' channel which will restart all shards. */
export default () => pub.publish('endProcess', 'true')
