import { Comment } from "./Comment"

export interface Post {
    id?:any,
    author:string,
    title:string,
    content:string
    comments?: Comment[],
    postDate?:any
}