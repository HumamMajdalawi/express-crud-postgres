import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalName: string;

  @Column()
  uuidName: string;

  @Column()
  mimetype: string;
}
