import { Data } from "@angular/router";

export interface LoginResponse{
    authenticationToken:string;
    refreshToken:string;
    expiresAt: Date;
    username: string;
}