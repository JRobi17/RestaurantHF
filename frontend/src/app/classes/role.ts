export class Role {
  id!: number;
  roleName!: string;
  roleDescription!: string;

  public get age() {
    return this.roleName;
  }
}
