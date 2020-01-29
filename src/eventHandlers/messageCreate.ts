/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const whitelist = ['409959187229966337', '420104212895105044', '552384921914572802']
import { Message } from 'eris'
import Registry from '../registry'
import config from '../data/config.json'

// Fired when a message is created
const handle = (message: Message) => {
  // Ignore if bot
  if (message.author.bot) return
  // Ignore guilds if in debug mode
  else if (config.debug && message.guildID && !whitelist.includes(message.guildID)) return

  return Registry.handler.run(message, 3)
  // TODO: XP on command usage
  // levels.giveXP(message)
}

module.exports = {
  handle,
  name: 'messageCreate'
}
