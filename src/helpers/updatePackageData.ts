import fs from 'node:fs/promises';
import path from 'node:path';

export async function updatePackageData(
  directoryPath: string,
  projectName: string
): Promise<{ templateVersion: string }> {
  try {
    const packageJsonPath = path.join(directoryPath, 'package.json');
    const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');
    let packageJson = JSON.parse(packageJsonData);
    const templateVersion = packageJson.version;

    packageJson.name = projectName;
    packageJson.version = '1.0.0';

    delete packageJson.license;
    delete packageJson.description;
    delete packageJson.author;

    // To add 'private' after common locations such as after 'license'
    const { name, version, ...rest } = packageJson;
    packageJson = {
      name,
      version,
      license: 'UNLICENSED',
      private: true,
      ...rest,
    };

    const formattedPackageJson = JSON.stringify(packageJson, null, 2) + '\n';

    await fs.writeFile(packageJsonPath, formattedPackageJson, 'utf-8');
    return { templateVersion };
  } catch (error) {
    console.error(
      `Failed to update package.json: ${error instanceof Error ? error.message : error}`
    );
    throw error;
  }
}
