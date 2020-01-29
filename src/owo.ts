/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const Base = require('eris-sharder').Base
import { RequireAllSync } from 'patron'

const eventFiles = RequireAllSync(`${__dirname}/eventHandlers`)

class OwO extends Base {
  launch() {
    eventFiles.forEach(file => this.bot.on(file.name, file.handle))
  }
}

module.exports = OwO
