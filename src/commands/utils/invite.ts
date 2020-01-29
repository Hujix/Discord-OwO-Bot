import { Command } from 'patron'
import permissions from '../../utils/constants/permissions'
import config from '../../data/config.json'

const InviteCommand = new Command({
  names: ['invite', 'link'],
  description: 'Want to invite this bot to another server? Use this command!',
  clientPermissions: [permissions.sendMessages, permissions.embedLinks],
  cooldown: 5000
})

InviteCommand.run = message => {
  message.channel.createMessage({
    embed: {
      title: 'OwO! Click me to invite me to your server!',
      url: config.invitelink,
      color: 4886754,
      thumbnail: {
        url: 'https://cdn.discordapp.com/app-icons/408785106942164992/00d934dce5e41c9e956aca2fd3461212.png'
      }
    }
  })
}

module.exports = InviteCommand
