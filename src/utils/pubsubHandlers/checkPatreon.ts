import OwO from '../../owo'

/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const supportGuild = '420104212895105044'
const daily = '449429399217897473'
const animal = '449429255781351435'

export default async (main: OwO, message: string) => {
  // Parse info
  const { userID } = JSON.parse(message)
  if (!userID) return

  // Grab guild
  const guild = main.bot.guilds.get(supportGuild)
  if (!guild) return

  // Grab member
  const member = await main.fetch.getMember(guild, userID)

  const dailyPerk = member.roles.includes(daily) ? 1 : 0
  const animalPerk = member.roles.includes(animal) ? 1 : 0

  // Add to database
  const sql =
    'UPDATE IGNORE user SET patreonDaily = ' +
    (dailyPerk ? 1 : 0) +
    ',patreonAnimal = ' +
    (animalPerk ? 1 : 0) +
    ' WHERE id = ' +
    userID +
    ';'
  main.mysqlhandler.query(sql)
}
