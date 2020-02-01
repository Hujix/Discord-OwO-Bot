/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import config from '../data/config.json'
import { datadog } from '../utils/datadog.js'

module.exports = {
  handle: () => (config.debug ? datadog.increment('guildcount') : undefined),
  name: 'guildCreate'
}
