import { Profile } from '../profile'
import { Post, Comment } from './'

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

  public static createComment(author: Profile|undefined, post: Post, text: string): Comment {
    if (!author) {
      throw new Error('Authentication required')
    }

    const comment = new Comment()
    comment.author = author
    comment.text = text
    comment.post = post

    return comment
  }
}
