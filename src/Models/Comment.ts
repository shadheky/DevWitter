import { User } from "./User"

export interface Comment {
    id?:any,
    userId:number
    postId:number,
    content:string,
    username?:string,
    user?:string,
    commentDate?:string
}