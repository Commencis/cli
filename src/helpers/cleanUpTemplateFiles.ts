import fs from 'node:fs/promises';
import path from 'node:path';

export async function cleanUpTemplateFiles(
  directoryPath: string,
  itemsToRemove?: string[]
): Promise<void> {
  if (!itemsToRemove) {
    return;
  }
  await Promise.all(
    itemsToRemove.map(async (item) => {
      const itemPath = path.join(directoryPath, item);
      try {
        // Check if the item exists
        await fs.access(itemPath);
        const stats = await fs.lstat(itemPath);

        if (stats.isDirectory()) {
          // Delete the directory recursively
          await fs.rm(itemPath, { recursive: true, force: true });
        } else {
          // Delete the file
          await fs.unlink(itemPath);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Ignore if the item does not exist
      }
    })
  );
}
