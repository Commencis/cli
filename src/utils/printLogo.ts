import chalk from 'chalk';
import { vice } from 'gradient-string';

import { COMMENCIS_LOGO } from '@/constants';

export function printLogo(): void {
  const logo = vice.multiline(COMMENCIS_LOGO);

  console.log(chalk.bold(logo));
}
