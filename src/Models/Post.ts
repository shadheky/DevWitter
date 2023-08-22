import { Comment } from "./Comment"
import { User } from "./User"

export interface Post {
    id?:any,
    userId?:number,
    title:string,
    content:string
    comments?: Comment[],
    postDate?:any,
    username?:string

}