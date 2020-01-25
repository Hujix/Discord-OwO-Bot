import OwO from '../../owo'

/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

let timer: NodeJS.Timeout | undefined

export default (main: OwO) => {
  // If there was a previous attempt to restart then reset it
  if (timer) clearTimeout(timer)

  const time = main.clusterID * 60000
  console.log(`ending ${main.clusterID} in ${time}ms`)
  timer = setTimeout(() => process.exit(0), time)
}
