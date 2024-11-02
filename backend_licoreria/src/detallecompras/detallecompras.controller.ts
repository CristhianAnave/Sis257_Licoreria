import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DetallecomprasService } from './detallecompras.service';
import { CreateDetallecompraDto } from './dto/create-detallecompra.dto';
import { UpdateDetallecompraDto } from './dto/update-detallecompra.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('detallecompras') //Swagger
@ApiBearerAuth() //lo de documentacion para logiar
@UseGuards(JwtAuthGuard) //lo de documentacion para logiar
@Controller('detallecompras')
export class DetallecomprasController {
  constructor(private readonly detallecomprasService: DetallecomprasService) {}

  @Post()
  create(@Body() createDetallecompraDto: CreateDetallecompraDto) {
    return this.detallecomprasService.create(createDetallecompraDto);
  }

  @Get()
  findAll() {
    return this.detallecomprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallecomprasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetallecompraDto: UpdateDetallecompraDto,
  ) {
    return this.detallecomprasService.update(+id, updateDetallecompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallecomprasService.remove(+id);
  }
}
