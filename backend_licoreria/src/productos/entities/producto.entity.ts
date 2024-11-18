import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Detallecompra } from 'src/detallecompras/entities/detallecompra.entity';
import { Detalleventa } from 'src/detalleventa/entities/detalleventa.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 10 })
  codigo: string;

  @Column('integer', { name: 'id_categoria' }) // adiionado
  idCategoria: number;

  @Column('varchar', { length: 30 })
  nombre: string;

  @Column('varchar', { length: 50 })
  descripcion: string;

  @Column('varchar', { length: 30 })
  tipoUnidad: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precioCompra: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioVenta: number;

  @Column('int')
  stock: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  @JoinColumn({ name: 'id_categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @OneToMany(() => Detallecompra, (detallecompra) => detallecompra.producto)
  detallecompras: Detallecompra[];

  @OneToMany(() => Detalleventa, (detalleventas) => detalleventas.producto)
  detalleventas: Detalleventa[];
}
