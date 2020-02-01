/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

import { Guild, Member } from 'eris'
import constants from '../utils/constants'
import mysql from '../utils/mysql'

module.exports = {
  handle: async (guild: Guild, member: Member) => {
    if (guild.id !== constants.supportServerID || !member.roles.includes(constants.patreonRoleID)) return

    // Update the database
    mysql.con.query(`UPDATE IGNORE user SET patreonDaily = 0,patreonAnimal = 0 WHERE id = ${member.id};`)

    try {
      // Alert the user in dm if possible that they will lose the patreon benefits
      const dmChannel = await member.user.getDMChannel()
      await dmChannel.createMessage('Just a heads up! Your Patreon benefits will not work if you leave the guild!')
    } catch {}
  },
  name: 'guildMemberRemove'
}
