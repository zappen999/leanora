import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm'

import { Profile } from '../../profile/entities/profile'

@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', length: 255 })
  public text: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date

  @OneToOne((type) => Profile)
  @JoinColumn()
  public author: Profile

  @Column({ nullable: true })
  public authorId: number

}
