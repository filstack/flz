import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { updateCommand } from './commands/update.js';
import { getCurrentVersion } from '../core/config.js';

const program = new Command();

program
  .name('flz')
  .description('CLI tool for automating AI agent context setup')
  .version(getCurrentVersion());

program
  .command('init')
  .description('Initialize flz in current project')
  .action(initCommand);

program
  .command('update')
  .description('Update installed skills to latest version')
  .action(updateCommand);

program.parse();
