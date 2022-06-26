import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  static from(user: any): UserEntity {
    const entity = new UserEntity();
    entity.name = user.name;
    entity.email = user.email;
    entity.password = user.password;
    return entity;
  }
}
