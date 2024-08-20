
import { IsEmail, IsNotEmpty, validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export class CreateStatetDto {  
  @IsNotEmpty({ message: "State Code is required" })
  StateCode: string;

  @IsNotEmpty({ message: "State Name is required" })
  StateName: string;

  @IsNotEmpty({ message: "Country Code is required" })
  CountryCode: string;

  @IsNotEmpty({ message: "Active is required" })
  Active: boolean;

  @IsNotEmpty({ message: "Sort Sequence is required" })
  SortSeq: number;
}



export async function validateDto(dto: CreateStatetDto): Promise<void> {
  const instance = plainToInstance(CreateStatetDto, dto);
  const errors = await validate(instance);

  if (errors.length > 0) {
    const messages = errors
      .map(error => Object.values(error.constraints))
      .flat()
      .join(', ');
    throw new Error(`Validation failed: ${messages}`);
  }
}