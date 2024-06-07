import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagintation.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { NATS_SERVICE, PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post()
  creteProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto);
  }

  @Get()
  fidAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  async findOPne(@Param('id') id: string) {
    //NOTE forma 1 de manejar errores
    return this.client.send({ cmd: 'find_one' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    //NOTE forma 2 de manejar errores
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException({
    //     message: `Product with id ${id} not found`,
    //     status: HttpStatus.BAD_REQUEST,
    //   });
    // }
  }

  @Post(':id')
  pathProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedProductDto: UpdateProductDto,
  ) {
    return this.client
      .send(
        { cmd: 'updated_product' },
        {
          id,
          ...updatedProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
