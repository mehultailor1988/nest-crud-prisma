import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsDefined, IsString } from "class-validator";

export class UpdateCityDto extends PartialType(CreateCityDto) {
    @IsDefined()
    @IsString()
    readonly id: string;
}
