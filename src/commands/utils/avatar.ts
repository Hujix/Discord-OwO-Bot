import { Command, ArgumentDefault } from 'patron'
import permissions from '../../utils/constants/permissions'
import { User } from 'eris'
import { highestRole, userTag } from 'helperis'

const AvatarCommand = new Command({
  names: ['avatar', 'user'],
  description: "Look at your or other people's avatar!",
  clientPermissions: [permissions.sendMessages, permissions.embedLinks, permissions.attachFiles],
  cooldown: 2000,
  arguments: [
    {
      example: '@OwO',
      key: 'user',
      name: 'user',
      type: 'user',
      defaultValue: ArgumentDefault.Author
    }
  ]
})

interface AvatarArgs {
  user: User
}

AvatarCommand.run = (message, args: AvatarArgs) => {
  if (!message.member) return

  const member = message.member.guild.members.get(args.user.id)
  if (!member) return

  const memberHighestRole = highestRole(member)
  const isBot = args.user.bot ? ' <:bot:489278383646048286>' : ''
  const nickname = member.nick ? `Nickname: ${member.nick}\n` : ''
  const embed = {
    color: memberHighestRole.color,
    image: { url: args.user.dynamicAvatarURL(undefined, 1024) },
    fields: [
      {
        name: `${userTag(args.user)}${isBot}\`${member.status}\``,
        value: `${nickname}\`ID: ${member.id}\`\n\`RoleColor: #${memberHighestRole.color.toString(16).toUpperCase()}\``
      }
    ]
  }

  message.channel.createMessage({ embed })
}

module.exports = AvatarCommand
