/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import secret from '../secret/wsserver.json'
import nfetch from 'node-fetch'

// TODO: SEE IF THIS IS PROPER TYPINGS FOR ITS RETURN VALUE
/** This is the info returned from the sharder info secret url. */
interface OwoSharderInfo {
  /** The amount of shards that the bot has. */
  shards: number
  /** The ID of the first shard. */
  firstShardID: number
  /** The ID of the last shard. */
  lastShardID: number
}

/** Fetches information from the sharder */
export default async () => {
  try {
    const result = (await nfetch(`${secret.url}/sharder-info/0`).then(res => res.json())) as OwoSharderInfo
    return result
  } catch (err) {
    return err
  }
}
