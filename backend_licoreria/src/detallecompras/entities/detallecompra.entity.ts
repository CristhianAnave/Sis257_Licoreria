import { Compra } from 'src/compra/entities/compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('detalle_compras')
export class Detallecompra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  cantidad: number;

  @Column('float', { nullable: false })
  precioCompra: number;

  @Column('float', { nullable: false })
  precioVenta: number;

  @Column('float', { nullable: false })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Compra, (compra) => compra.detallecompras)
  @JoinColumn({ name: 'id_compra', referencedColumnName: 'id' })
  compras: Compra;

  @ManyToOne(() => Producto, (producto) => producto.detallecompras)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}
