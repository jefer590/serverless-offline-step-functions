import chalk from 'chalk';
import consola from 'consola';

export class Logger {
  private static INSTANCE: Logger;
  private readonly logPrefix = chalk.magenta('[Step Functions API Simulator]');
  private isDebuggerOn: boolean;

  private constructor() {
    this.isDebuggerOn = false;
  }

  public static getInstance(): Logger {
    if (!this.INSTANCE) {
      this.INSTANCE = new Logger();
    }

    return this.INSTANCE;
  }

  public turnOnDebugger(): void {
    this.isDebuggerOn = true;
  }

  public success(message: string): void {
    consola.success(`${this.logPrefix} ${chalk.greenBright(message)}`);
  }

  public debug(message: string): void {
    if (this.isDebuggerOn) {
      consola.log(`${this.logPrefix} ${chalk.greenBright(message)}`);
    }
  }

  public log(message: string): void {
    consola.log(`${this.logPrefix} ${chalk.blueBright(message)}`);
  }

  public error(messageError: string): void {
    consola.error(`${this.logPrefix} ${chalk.red(messageError)}`);
  }

  public warning(messageError: string): void {
    consola.warn(`${this.logPrefix} ${chalk.yellow(messageError)}`);
  }
}
