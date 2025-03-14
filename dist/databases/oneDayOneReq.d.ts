declare class OneRequestOneDayDb {
    userData: Map<string, number>;
    constructor();
    initialize(): Promise<void>;
    addUserRequest(userId: string): Promise<void>;
    clearData(): Promise<void>;
    hasReachedRequestLimit(userId: string): Promise<boolean>;
    saveRequestData(userId: string): Promise<void>;
    checkAndReset(): void;
}
declare const reqDB: OneRequestOneDayDb;
export default reqDB;
