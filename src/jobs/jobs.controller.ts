import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Roles } from '../common/decorators/roles.decorator'; // Import do decorator

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // Apenas trabalhadores podem visualizar todos os pedidos
  @Roles('worker')
  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  // Apenas clientes podem criar um novo pedido de limpeza
  @Roles('client')
  @Post()
  async create(@Body() body: any) {
    return this.jobsService.create(body);
  }

  // Apenas trabalhadores podem atualizar o status de um pedido
  @Roles('worker')
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.jobsService.updateStatus(id, body.status);
  }
}
