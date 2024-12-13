import fs from 'node:fs/promises';
import path from 'node:path';

type ProjectMetaData = {
  templateId: string;
  templateVersion: string;
};

export async function createMetaData(
  directoryPath: string,
  data: ProjectMetaData
): Promise<void> {
  const configFilePath = path.join(directoryPath, 'commencis.json');
  const metaData = {
    templateId: data.templateId,
    templateVersion: data.templateVersion,
    creationDate: new Date().toISOString(),
  };
  const formattedMetaData = JSON.stringify(metaData, null, 2) + '\n';

  try {
    // Write the metadata to commencis.json
    await fs.writeFile(configFilePath, formattedMetaData, 'utf-8');
  } catch (error) {
    console.error(
      `Failed to create ${configFilePath}: ${error instanceof Error ? error.message : error}`
    );
  }
}
