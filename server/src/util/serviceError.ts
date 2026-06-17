export class ServiceError extends Error {
    name: string = "ServiceError";
    constructor(public reason: string, message: string) {
        super(message);
        this.reason = reason;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}