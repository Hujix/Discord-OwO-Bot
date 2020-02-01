/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import { datadog } from '../utils/datadog'
import config from '../data/config.json'

module.exports = {
  handle: () => (config.debug ? datadog.decrement('guildcount') : undefined),
  name: 'guildDelete'
}