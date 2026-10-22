export class getUserResponseDTO {
  constructor(row) {
    this.id = row.id;
    this.name = row.id;
    this.login = row.login;
    this.password_hash = row.password_hash;
  }
}
