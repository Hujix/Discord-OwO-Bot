/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import { Message, PossiblyUncachedMessage, Emoji, PrivateChannel, GroupChannel } from 'eris'
import constants from '../utils/constants'

const validReactionListeners = [constants.emojis.leftArrow, constants.emojis.rightArrow]

const handleHelpReaction = (message: Message, emoji: Emoji) => {
  const [embed] = message.embeds
  // Only the battlehelp has this phrase in the author name
  if (!embed.author?.name?.startsWith('Guide to battle!')) return

  // The footer will have something like page 1/7
  if (!embed.footer?.text.startsWith('page ')) return

  const page = embed.footer.text.substring(5, embed.footer.text.length - 2)

  const newPage = emoji.name === constants.emojis.rightArrow ? Number(page) + 1 : Number(page) - 1
  const newEmbed = {
    ...embed,
    footer: { text: `page ${newPage}/${constants.battleHelpPages.length}` },
    image: { url: constants.battleHelpPages[newPage - 1] }
  }

  message.edit({ embed: newEmbed })
}

// TODO: emoji type is technically inaccurate. Need fix inside eris
module.exports = {
  handle: async (rawMessage: PossiblyUncachedMessage, emoji: Emoji, userID: string) => {
    // TODO: check if we are supporting dms
    if (rawMessage.channel instanceof PrivateChannel || rawMessage.channel instanceof GroupChannel) return

    const user = rawMessage.channel.client.users.get(userID)
    if (!user || user.bot) return
    // Emoji.name can be potentially null so we want to make sure it exists
    if (!emoji.name && !validReactionListeners.includes(emoji.name)) return

    const botPerms = rawMessage.channel.permissionsOf(rawMessage.channel.client.user.id)
    if (!(rawMessage instanceof Message)) {
      if (!botPerms.has('readMessageHistory')) return

      rawMessage = await rawMessage.channel.getMessage(rawMessage.id).catch(() => rawMessage)

      // If the message was unable to be fetched cancel out
      if (!(rawMessage instanceof Message)) return
    }

    // Message must be from OwO
    if (rawMessage.author.id !== rawMessage.channel.client.user.id) return

    handleHelpReaction(rawMessage, emoji)
  },
  name: 'messageReactionAdd'
}
