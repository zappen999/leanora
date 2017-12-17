import { getRepository } from 'typeorm'
import { Post, Comment } from './'

export class BlogFacade {
  public getAllPosts(): Promise<Post[]> {
    return getRepository(Post)
      .createQueryBuilder('post')
      .getMany()
  }

  public savePost(post: Post): Promise<Post> {
    return getRepository(Post).save(post)
  }
}
