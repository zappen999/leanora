import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm'

import * as bcrypt from 'bcrypt'

@Entity()
export class Membership extends BaseEntity {

  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', unique: true })
  public identifier: string

  @Column({ type: 'text', length: 500 })
  public passwordHash: string

  public async setPassword(password: string): Promise<void> {
    this.passwordHash = await bcrypt.hash(password, 10)
  }

  public async matchPasswordHash(password: string): Promise<boolean> {
    return !!await bcrypt.compare(password, this.passwordHash)
  }

}
