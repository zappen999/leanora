import { Profile } from '../profile'
import { Post } from './entities/post'

export class BlogFactory {
  public static createPost(author: Profile|undefined, text: string): Post {
    if (!author) {
      throw new Error('Authentication required')
    }

    const post = new Post()
    post.createdAt = new Date()
    post.text = text
    post.author = author
    return post
  }
}
