import fs from 'node:fs/promises';
import path from 'node:path';

import { PACKAGE_DEFAULTS } from '@/constants';
import { omitKeys } from '@/utils/omitKeys';

type UpdatePackageDataArgs = {
  directoryPath: string;
  projectName: string;
  scriptsToRemove?: string[];
  dependenciesToRemove?: string[];
  devDependenciesToRemove?: string[];
};

export async function updatePackageData({
  directoryPath,
  projectName,
  scriptsToRemove,
  dependenciesToRemove,
  devDependenciesToRemove,
}: UpdatePackageDataArgs): Promise<{
  templateVersion: string;
}> {
  try {
    const packageJsonPath = path.join(directoryPath, 'package.json');
    const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');

    const {
      name: _name,
      license: _license,
      description: _description,
      author: _author,
      version: templateVersion,
      build,
      scripts,
      dependencies,
      devDependencies,
      ...originalPackageJsonData
    } = JSON.parse(packageJsonData);

    const updatedScripts = omitKeys(scripts, scriptsToRemove);
    const updatedDependencies = omitKeys(dependencies, dependenciesToRemove);
    const updatedDevDependencies = omitKeys(
      devDependencies,
      devDependenciesToRemove
    );

    const updatedPackageJson = {
      name: projectName,
      version: PACKAGE_DEFAULTS.version,
      build,
      license: PACKAGE_DEFAULTS.license,
      private: PACKAGE_DEFAULTS.private,
      scripts: updatedScripts,
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies,
      ...originalPackageJsonData,
    };

    const formattedPackageJson =
      JSON.stringify(updatedPackageJson, null, 2) + '\n';

    await fs.writeFile(packageJsonPath, formattedPackageJson, 'utf-8');
    return { templateVersion };
  } catch (error) {
    console.error(
      `Failed to update package.json: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
}
