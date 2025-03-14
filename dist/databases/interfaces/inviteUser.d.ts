export interface Invite {
    username: string;
    userId: string;
}
export interface InviteUser {
    userId: string;
    invites: Invite[];
    lastRequestDate: Date;
    dailyRequests: number;
}
