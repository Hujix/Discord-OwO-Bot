import { Command } from 'patron'
import permissions from '../../utils/constants/permissions'
import config from '../../data/config.json'
import emotes from '../../data/emotes.json'
import { Message } from 'eris'
import emojis from '../../utils/constants/emojis'
import { commandDetails } from '../../utils/constants/commandDetails'
import constants from '../../utils/constants'

const makeBattleFooter = (page: number) => `page ${page}/${constants.battleHelpPages.length}`

const battleEmbed = {
  author: {
    name: 'Guide to battle!'
  },
  description: ['Have any questions? Please feel free to ask in our server!', config.guildlink].join('\n'),
  color: config.embed_color,
  image: {
    url: constants.battleHelpPages[0]
  },
  footer: {
    text: makeBattleFooter(1)
  }
}

interface HelpCommandArgs {
  command?: Command
  battletype?: string
}

const HelpCommand = new Command({
  names: ['help'],
  arguments: [
    // {
    //   example: 'owo help cowoncy',
    //   type: 'command',
    //   defaultValue: undefined
    // },
    {
      example: 'owo help battle',
      key: 'battletype',
      name: 'battletype',
      type: 'string',
      defaultValue: undefined
    }
  ],
  description: 'This displays the commands or more info on a specific command',
  clientPermissions: [permissions.sendMessages, permissions.embedLinks],
  cooldown: 1000
})

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
HelpCommand.run = async (message, args: HelpCommandArgs) => {
  console.log('help ran', args)
  // A valid command name was passed
  if (args.command) {
    const details = commandDetails.find(d => d.name === args.command?.names[0])

    const embed = {
      description: args.command.description,
      title: args.command.names[0],
      fields: [
        {
          name: 'Aliases',
          value: args.command.names.join(', ')
        }
      ]
    }
    if (details?.examples)
      embed.fields.push({
        name: 'Example Command(s)',
        value: details.examples.join(' , ')
      })
    if (details?.related)
      embed.fields.push({
        name: 'Related Command(s)',
        value: details.related.join(' , ')
      })

    return message.channel.createMessage({
      content: ['Remove brackets when typing commands', '[] = optional arguments', '{} = optional user input'].join(
        '\n'
      ),
      embed
    })
  }

  // There was nothing provided just owo help
  if (!args.battletype) {
    const embed = {
      description: [
        'Here is the list of commands!',
        'For more info on a specific command, use `owo help {command}',
        'Need more help?',
        `Come join our [guild](${config.guildlink})`
      ].join('\n'),
      color: 4886754,
      // eslint-disable-next-line @typescript-eslint/camelcase
      author: { name: 'Command List', icon_url: message.author.avatarURL },
      fields: [
        { name: '🎖 Rankings', value: '`top`  `my`' },
        { name: '💰 Economy', value: '`cowoncy`  `give`  `daily`  `vote`  `quest`  `checklist`  `shop`  `buy`' },
        {
          name: '🌱 Animals',
          value:
            '`zoo`  `hunt`  `sell`  `battle`  `inv`  `equip`  `autohunt`  `owodex`  `lootbox`  `crate`  `battlesetting`  `team`  `weapon`  `rename` `dismantle`'
        },
        { name: '🎲 Gambling', value: '`slots`  `coinflip`  `lottery`  `blackjack`  `drop`' },
        { name: '🎱 Fun', value: '`8b`  `define`  `gif`  `pic`  `translate`  `roll`  `choose`' },
        {
          name: '🎭 Social',
          value: '`cookie` `ship`  `pray`  `curse`  `marry`  `emoji`  `profile`  `level`  `wallpaper`  `bell`  `owoify`'
        },
        { name: '😂 Meme Generation', value: '`spongebobchicken`  `slapcar`  `isthisa`  `drake`  `distractedbf`' },
        { name: '🙂 Emotes', value: `\`${Object.keys(emotes.sEmote).join('` `')}\`` },
        {
          name: '🤗 Actions',
          value: `\`${Object.keys(emotes.uEmote)
            .slice(0, -2)
            .join('` `')}\` \`bully\``
        },
        {
          name: '🔧 Utility',
          value:
            '`feedback`  `stats`  `link`  `guildlink`  `disable`  `censor`  `patreon`  `avatar`  `announcement`  `rules`  `suggest`  `shards`  `math`  `merch`  `color`'
        }
      ]
    }
    message.channel.createMessage({ embed })
    return
  }

  let response: Message | undefined

  switch (args.battletype) {
    // Simply break as they use page 0
    case 'battle':
    case 'team':
      response = await message.channel.createMessage({ embed: battleEmbed })
      break
    case 'crate':
      response = await message.channel.createMessage({
        embed: { ...battleEmbed, image: { url: constants.battleHelpPages[1] }, footer: { text: makeBattleFooter(2) } }
      })
      break
    case 'weapon':
      response = await message.channel.createMessage({
        embed: { ...battleEmbed, image: { url: constants.battleHelpPages[2] }, footer: { text: makeBattleFooter(3) } }
      })
      break
    case 'battlesetting':
      response = await message.channel.createMessage({
        embed: { ...battleEmbed, image: { url: constants.battleHelpPages[5] }, footer: { text: makeBattleFooter(6) } }
      })
      break
    case 'weaponshard':
      response = await message.channel.createMessage({
        embed: { ...battleEmbed, image: { url: constants.battleHelpPages[6] }, footer: { text: makeBattleFooter(7) } }
      })
      break
    default:
      return message.channel.createMessage('**🚫 |** Could not find that command :c')
  }

  if (response) {
    await response.addReaction(emojis.leftArrow)
    response.addReaction(emojis.rightArrow)
  }
}

module.exports = HelpCommand
