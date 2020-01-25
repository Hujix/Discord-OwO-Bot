import OwO from '../../owo'

/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

export default (main: OwO, message: string) => {
  if (main.debug) return

  const { clusterID, userID, msg } = JSON.parse(message)
  if (clusterID !== main.clusterID) return

  main.sender.msgUser(userID, msg)
}
