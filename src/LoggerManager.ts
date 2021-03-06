import { Logger } from './Logger';
import {IConstructor, ILogger, ILoggerManager} from '@nbsolutions/interfaces';

export class LoggerManager implements ILoggerManager {
    private $loggers: Map<IConstructor, ILogger>;
    private static $instance: ILoggerManager;

    private constructor() {
        this.$loggers = new Map();
    }

    protected _createLogger(tag: string): ILogger {
        return new Logger(tag);
    }

    public getLogger(obj: IConstructor): ILogger {
        if (!this.$loggers.has(obj)) {
            this.$loggers.set(obj, this._createLogger(obj.name));
        }

        return this.$loggers.get(obj);
    }

    public static getInstance(): ILoggerManager {
        if (!LoggerManager.$instance) {
            LoggerManager.$instance = new LoggerManager();
        }

        return LoggerManager.$instance;
    }
}
