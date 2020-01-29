import { Command } from 'patron'
import permissions from '../../utils/constants/permissions'
import config from '../../data/config.json'

const MerchCommand = new Command({
  names: ['merch'],
  description: "Come take a look at OwO's avatar's merch store!",
  clientPermissions: [permissions.sendMessages, permissions.embedLinks],
  cooldown: 6000
})

MerchCommand.run = message => {
  message.channel.createMessage({
    embed: {
      color: config.embed_color,
      author: {
        name: `${message.author.username}! Come check out some merch!`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        icon_url: message.author.avatarURL
      },
      description: [
        "Want to support the OwO's avatar's creator? Come check out his merch!",
        '**Shirts**: https://rdbl.co/2U5Xd9x',
        '**Stickers**: https://rdbl.co/2T9EM6w'
      ].join('\n')
    }
  })
}

module.exports = MerchCommand
