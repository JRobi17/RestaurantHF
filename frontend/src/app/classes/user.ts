import {Role} from "./role";

export class User {
  id!: number;
  userName!: string;
  userFirstName!: string;
  userLastName!: string;
  role!: Set<Role>;
}
