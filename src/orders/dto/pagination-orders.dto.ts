import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagintation.dto';
import { OrderStatus, OrderStatusList } from '../enum/orders.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `status must be one of ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
