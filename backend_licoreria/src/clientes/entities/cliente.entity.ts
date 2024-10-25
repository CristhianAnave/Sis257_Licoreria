import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 10 })
  ci: string;

  @Column('varchar', { length: 50 })
  nombres: string;

  @Column('varchar', { length: 30 })
  apellidoPaterno: string;

  @Column('varchar', { length: 30 })
  apellidoMaterno: string;

  @Column('varchar', { length: 30 })
  email: string;

  @Column('varchar', { length: 8 })
  celular: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;
}
