import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'

import { Membership } from '../../membership/entities/membership'

@Entity()
export class Profile extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', length: 255 })
  public username: string

  // cascade delete (remove profile when membership is removed)
  @OneToOne((type) => Membership, {
    cascadeRemove: true,
    cascadeUpdate: true,
  })
  @JoinColumn()
  public membership: Membership

}
