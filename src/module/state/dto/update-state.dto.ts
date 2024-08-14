import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsString } from "class-validator";
import { CreateStatetDto } from './create-state.dto';

export class UpdateStateDto extends PartialType(CreateStatetDto) {
    @IsDefined()
    @IsString()
    readonly id: string;
}
