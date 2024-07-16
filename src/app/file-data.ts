import {SharedUser} from "./shared-user";

export class FileData {

  file_id: number;
  filename: string;
  isFile: boolean;
  star: boolean;
  format: string;
  type: string;
  dir: string;
  files: FileData[];
  share: SharedUser[];

}
