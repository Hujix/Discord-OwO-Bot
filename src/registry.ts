import { Registry, Handler } from 'patron'
import path from 'path'

const registry = new Registry({ defaultReaders: true })
  // .registerPreconditions(path.join(__dirname, 'inhibitors/'))
  // .registerArgumentPreconditions(path.join(__dirname, 'validators/'))
  // .registerTypeReaders(path.join(__dirname, 'readers/'))
  // .registerPostconditions(path.join(__dirname, 'postconditions/'))
  .registerCommands(path.join(__dirname, 'commands/'))

const handler = new Handler({ registry })

export default {
  registry,
  handler
}
