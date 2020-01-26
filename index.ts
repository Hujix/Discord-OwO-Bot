/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const debug = false

import tracer from 'dd-trace'
if (!debug) tracer.init()

// Grab tokens and secret files
import scuttesterauth from './tokens/scuttester-auth.json'
import owoauth from './tokens/owo-auth.json'
// Config file
import config from './src/data/config.json'
import fetchInit from './utils/fetchInit'
import resetBot from './utils/resetBot'
import { milliseconds } from './src/utils/constants/enums/time.js'
// Eris-Sharder
// TODO: See if we can get typings PRd to eris sharder
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Master as Sharder } from 'eris-sharder'
import si from 'systeminformation'
import cluster from 'cluster'

// Helper files
if (cluster.isMaster) {
  // TODO: THIS IS VERY WORRISOME TO ME!REVIEW WHY THIS IS NEEDED AS IT CAN CAUSE THE ENTIRE BOT TO CRASH IN A LOOP! BAD BEHAVIOR!
  setInterval(async () => {
    /* Minimum ram (1.5GB) */
    const resetbyte = 2.5 * 1024 * 1024 * 1024

    const mem = await si.mem()
    const ram = mem.available - mem.swaptotal
    console.log(`CURRENT RAM: ${ram / (1024 * 1024 * 1024)}G`)
    if (ram <= resetbyte) {
      console.log('NOT ENOUGH RAM. RESETTING SHARDS')
      resetBot()
    }
  }, milliseconds.MINUTE * 30)
}

const startup = async () => {
  try {
    let shards = 1
    let firstShardID = 0
    let lastShardID = 0
    //determine how many shards we will need for this manager
    if (!debug && cluster.isMaster) {
      const result = await fetchInit()
      shards = result.shards
      firstShardID = result.firstShardID
      lastShardID = result.lastShardID
    }
    // How many clusters we will have
    let clusters = Math.ceil(shards / 5)
    if (debug) {
      shards = 4
      firstShardID = 0
      lastShardID = shards - 1
      clusters = 2
    }
    console.log(`Creating shards ${firstShardID}~${lastShardID} out of ${shards} total shards!`)

    const auth = debug ? scuttesterauth : owoauth
    // Start sharder
    new Sharder(`Bot ${auth.token}`, config.sharder.path, {
      name: config.sharder.name,
      clientOptions: config.eris.clientOptions,
      debug: true,
      shards,
      clusters,
      firstShardID,
      lastShardID
    })
  } catch (e) {
    console.error('Failed to start eris sharder')
    console.error(e)
  }
}

startup()
