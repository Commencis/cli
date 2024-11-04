import fs from 'node:fs/promises';

export async function cleanUpDirectory(directoryPath: string): Promise<void> {
  try {
    await fs.rm(directoryPath, { recursive: true, force: true });
  } catch (error) {
    console.error(`Failed to delete directory ${directoryPath}: ${error}`);
    throw error;
  }
}
