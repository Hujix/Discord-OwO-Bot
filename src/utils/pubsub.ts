/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import redis from 'redis'
import pubsubHandlers from './pubsubHandlers'
import OwO from '../owo'

const sub = redis.createClient()
const pub = redis.createClient()

type OwOPubSubChannels =
  | 'checkPatreon'
  | 'endProcess'
  | 'msgChannel'
  | 'msgUser'
  | 'resetDailyWeapons'
  | 'updateShardInfo'

class PubSub {
  channels = {
    checkPatreon: pubsubHandlers.checkPatreon,
    endProcess: pubsubHandlers.endProcess,
    msgChannel: pubsubHandlers.msgChannel,
    msgUser: pubsubHandlers.msgUser,
    resetDailyWeapons: pubsubHandlers.resetDailyWeapons,
    updateShardInfo: pubsubHandlers.updateShardInfo
  }

  constructor(main: OwO) {
    // Redirect messages to handlers
    sub.on('message', (channel: OwOPubSubChannels, message) => {
      if (this.channels[channel]) this.channels[channel](main, message)
    })

    // Subscribe to all events in the pubsubHandler folder
    sub.subscribe(Object.keys(this.channels))
  }

  publish(channel: OwOPubSubChannels, message: string) {
    return pub.publish(channel, message)
  }
}

export default PubSub
