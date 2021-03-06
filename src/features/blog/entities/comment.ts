import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { Post } from './post'
import { Profile } from '../../profile'

@Entity()
export class Comment extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', length: 255 })
  public text: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date

  @ManyToOne((type) => Post, {
    cascadeRemove: true,
  })
  public post: Post

  @Column({ nullable: true })
  public postId: number

  @JoinColumn()
  @OneToOne((type) => Profile)
  public author: Profile

  @Column({ nullable: true })
  public authorId: number

}
