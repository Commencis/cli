import { SimpleGit, simpleGit, SimpleGitOptions } from 'simple-git';

const options: SimpleGitOptions = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
  config: [],
};

export const git: SimpleGit = simpleGit(options);
