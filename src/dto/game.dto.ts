import { ConsoleDTO } from "./console.dto";

export interface GameDTO {
  id?: number;
  title: string;
  console_id:number,
  console?: ConsoleDTO;
}
