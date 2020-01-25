/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import request from 'request'

import OwO from '../../owo'
import secret from '../../../secret/wsserver.json'

const fetchInfo = (main: OwO) => {
  const result = { password: secret.password }

  const shardData = main.bot.shards.map(val => {
    result[val.id] = {
      shard: val.id,
      status: val.status,
      ping: val.latency,
      start: main.bot.uptime,
      cluster: main.clusterID,
      updatedOn: new Date()
    }
  })

  return result
}

const cooldown = 3000
let onCooldown = false

export default (main: OwO) => {
  if (onCooldown) return

  onCooldown = true
  setTimeout(() => (onCooldown = false), cooldown)

  request(
    {
      method: 'POST',
      uri: `${secret.url}/update-shard`,
      json: true,
      body: fetchInfo(main)
    },
    err => {
      if (err) {
        console.error(err)
        throw err
      }
    }
  )
}
