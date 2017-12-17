import { getRepository } from 'typeorm'
import { Post, Comment, BlogFactory } from './'
import { Profile } from '../profile'
import * as DataLoader from 'dataloader'

export class BlogFacade {
  protected postByIdLoader: DataLoader<number, Post|null>

  constructor() {
    this.postByIdLoader = new DataLoader(this.getBatchPostByIds)
  }

  public getAllPosts(): Promise<Post[]> {
    return getRepository(Post)
      .createQueryBuilder('post')
      .getMany()
  }

  public savePost(post: Post): Promise<Post> {
    return getRepository(Post).save(post)
  }

  public saveComment(comment: Comment): Promise<Comment> {
    return getRepository(Comment).save(comment)
  }

  public async createComment(author: Profile|undefined, postId: number, text: string) {
    const post = await this.postByIdLoader.load(postId)

    if (!post) {
      throw new Error('Post not found')
    }

    const comment = BlogFactory.createComment(author, post, text)

    return this.saveComment(comment)
  }

  // todo: use dataloader to avoid the n+1 problem
  public getRepliesForPost(postId: number): Promise<Comment[]> {
    return getRepository(Comment)
      .createQueryBuilder('comment')
      .where('comment.postId = :postId')
      .setParameter('postId', postId)
      .getMany()
  }

  protected async getBatchPostByIds(ids: number[]) {
    const posts = await getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id IN(:ids)')
      .setParameter('ids', ids)
      .getMany()

    // make sure that keys that is not found gets null as value
    return ids.map((id) => posts.find((item) => item.id === id) || null)
  }
}
