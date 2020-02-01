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
  handle: async (guild: Guild, member: Member, oldMember: Member) => {
    if (guild.id !== constants.supportServerID || oldMember.roles.length === member.roles.length) return

    const gainedRole = member.roles.length > oldMember.roles.length
    const updatedRoleID = gainedRole
      ? member.roles.find(id => !oldMember.roles.includes(id))
      : oldMember.roles.find(id => !member.roles.includes(id))
    if (!updatedRoleID) return

    if (![constants.patreonAnimalID, constants.patreonDailyID].includes(updatedRoleID)) return

    const query =
      updatedRoleID === constants.patreonDailyID
        ? gainedRole
          ? // Gained patreon daily role
            `INSERT INTO user (id,count,patreonDaily) VALUES (${member.id},0,1) ON DUPLICATE KEY UPDATE patreonDaily = 1;SELECT * FROM user WHERE id = ${member.id};`
          : // Lost patreon daily role
            `UPDATE IGNORE user SET patreonDaily = 0 WHERE id = ${member.id};`
        : gainedRole
        ? // Gained patreon animal role
          `INSERT INTO user (id,count,patreonAnimal) VALUES (${member.id},0,1) ON DUPLICATE KEY UPDATE patreonAnimal = 1;SELECT * FROM user WHERE id = ${member.id};`
        : // Lost patreon animal role
          `UPDATE IGNORE user SET patreonAnimal = 0 WHERE id = ${member.id};`

    const response = [
      gainedRole
        ? 'Thank you for supporting owo bot! Every dollar counts and I appreciate your donation!! If you encounter any problems, let me know!'
        : 'Your patreon donation has expired! Thank you **so** much for supporting OwO bot! <3',
      '',
      'XOXO',
      '**Scuttler#0001**'
    ].join('\n')

    mysql.con.query(query)

    try {
      const dmChannel = await member.user.getDMChannel()
      await dmChannel.createMessage(response)
    } catch {}
  },
  name: 'guildMemberUpdate'
}
