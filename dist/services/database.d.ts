import { User } from "telegraf/typings/core/types/typegram.js";
import { DatabaseClient } from "../interfaces.js";
import { IntroDocument } from "../databases/interfaces/Intro.js";
declare class Database {
    client: DatabaseClient;
    constructor();
    initialize(): Promise<void>;
    saveIntro(IntroDocument: IntroDocument): Promise<number>;
    getIntroMessages(userId: number): Promise<number | undefined>;
    saveUser(user: User): Promise<User>;
    deleteIntro(userId: number): Promise<any>;
    updateAIOAttribute(userId: number, attribute: any): Promise<any>;
}
declare const database: Database;
export default database;
