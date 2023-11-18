export class InvalidCredentialsError extends Error {
  constructor() {
    super("Erro, crendenciais de acesso inválido");
    this.name = "InvalidCredentialsError";
  }
}
