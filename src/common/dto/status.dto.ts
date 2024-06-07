import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from 'src/orders/enum/orders.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `status must be one of ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
