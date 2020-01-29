import { Command } from 'patron'
import permissions from '../../utils/constants/permissions'
import config from '../../data/config.json'
import emojis from '../../utils/constants/emojis'

const GuildlinkCommand = new Command({
  names: ['guildlink'],
  description: 'Come join our guild! You might be awarded with special gifts once in a while!',
  clientPermissions: [permissions.sendMessages, permissions.embedLinks],
  cooldown: 5000
})

GuildlinkCommand.run = message => {
  message.channel.createMessage(
    [
      `${emojis.owo} **|** Come join our discord to ask for help or just have fun!`,
      `**${emojis.blank} |** ${config.guildlink}`
    ].join('\n')
  )
}

module.exports = GuildlinkCommand
