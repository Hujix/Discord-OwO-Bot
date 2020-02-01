/*
 * OwO Bot for Discord
 * Copyright (C) 2019 Christopher Thai
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

/***** Datadog *****/
import { StatsD } from 'node-dogstatsd'

const log = new StatsD('localhost')

export const datadog = {
  /** Increases the value in the datadog stats by 1 */
  increment: (name: string, tags?: string[]) => log.increment(`owo.${name}`, undefined, tags),
  /** Decreases the value in the datadog stats by 1 */
  decrement: (name: string, tags?: string[]) => log.decrement(`owo.${name}`, undefined, tags),
  /** Increases or decreases the value in the datadog stats by the amount provided. */
  value: (name: string, amount: number, tags?: string[]) => {
    if (amount > 0) log.incrementBy(`owo.${name}`, amount, tags)
    else if (amount < 0) log.decrementBy(`owo.${name}`, Math.abs(amount), tags)
  }
}
