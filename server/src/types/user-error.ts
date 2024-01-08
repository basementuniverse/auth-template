export class UserError extends Error {
  public status: number;
  public attachments?: any;

  public constructor(
    message: string,
    status: number = 400,
    attachments?: any
  ) {
    super(message);

    this.status = status;
    this.attachments = attachments;
  }
}
