import { Post } from "./Post";


export interface User {
    id?:any,
    username:string,
    password:string,
    comments?: Comment[],
    posts?: Post[]
    
}