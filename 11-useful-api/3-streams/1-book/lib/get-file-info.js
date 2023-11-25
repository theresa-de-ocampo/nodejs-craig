import { constants as fsConstants } from "fs";
import { access, stat } from "fs/promises";

export async function getFileInfo(filePath) {
  let fileInfo = {};

  try {
    const info = await stat(filePath);
    fileInfo = {
      isFile: info.isFile(),
      isDir: info.isDirectory()
    };

    if (!fileInfo?.new) {
      await access(filePath, fsConstants.R_OK);
      fileInfo = { ...fileInfo, canRead: true };

      await access(filePath, fsConstants.W_OK);
      fileInfo = { ...fileInfo, canWrite: true };
    }
  } catch (error) {
    fileInfo = { new: true };
  }

  return fileInfo;
}
