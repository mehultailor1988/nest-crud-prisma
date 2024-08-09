import { Expose } from "class-transformer";
import { AbstractDto } from "src/common";

export class UserDto extends AbstractDto {
  @Expose()
  email: string;

  @Expose()
  name: string;
}