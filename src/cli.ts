import chalk from 'chalk';
import { Command } from 'commander';

import { create } from '@/commands';

type CreateOptions = {
  template?: string;
};

export async function run(): Promise<void> {
  try {
    const program = new Command();

    program
      .description(chalk.bold('Welcome to Commencis CLI'))
      .usage('[command] [options]')
      .configureHelp({
        subcommandTerm: (cmd) => cmd.name() + ' ' + cmd.usage(),
      })
      .addHelpText(
        'after',
        `
Example call:
  $ npx commencis create my-app --template react-vite
  `
      );

    program
      .command('create')
      .description('create a new project from a template')
      .usage('[projectName] [options]')
      .argument('[projectName]', 'Specify the project name')
      .option('--template <template>', 'Specify the template to use')
      .action(async (projectName?: string, options?: CreateOptions) => {
        await create({
          projectNameFromOptions: projectName,
          templateIdFromOptions: options?.template,
        });
      });

    program.parse(process.argv);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    process.exit(1);
  }
}
