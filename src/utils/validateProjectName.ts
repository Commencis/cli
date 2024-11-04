import validateNpmPackageName from 'validate-npm-package-name';

export function validateProjectName(projectName?: string): boolean | string {
  if (!projectName) {
    return 'Invalid project name. Please try again.';
  }
  const { validForNewPackages } = validateNpmPackageName(projectName);

  return (
    Boolean(validForNewPackages) || 'Invalid project name. Please try again.'
  );
}
