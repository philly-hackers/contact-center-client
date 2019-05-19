import { Injectable } from '@angular/core';

@Injectable()
export class ContextService {

    constructor() {}

    public get auth() {
       return sessionStorage.getItem('session');
    }

    public set auth(user) {
        if(user === 'false') {
            sessionStorage.removeItem('session');
        } else {
            sessionStorage.setItem('session', user);
        }
    }

    

}
