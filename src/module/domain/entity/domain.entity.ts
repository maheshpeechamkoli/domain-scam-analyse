// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('domain')
// export class Domain {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column('varchar')
//   title: string | undefined;

//   @Column('varchar', { length: 500, nullable: true })
//   content: string | undefined;
// }


import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('domain')
export class Domain {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', { length: 500, nullable: true})
  domain: string | undefined;

  @Column({ type: "numeric"})
  score!: number;

  @Column({ type: "numeric"})
  popularity_rank!: number;

  @Column({ type: "boolean"})
  blacklisted!: boolean;

  @Column({ type: "boolean"})
  ssl_valid!: boolean;

  @Column({ type: "timestamptz"})
  scamadviser_created_at!: Date;

  @Column({ type: "timestamptz" })
  scamadviser_updated_at!: Date;

  @Column({ type: "timestamptz"})
  created_at: Date = new Date;
  
}