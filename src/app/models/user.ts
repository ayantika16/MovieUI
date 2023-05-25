import { Role } from "./role";

export class User {
    
    id:number|any;
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    petname: string | undefined;
    role:Array<Role>|undefined;
  


}