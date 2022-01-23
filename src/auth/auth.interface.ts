import {
  IsEmail,
  MinLength,
  MaxLength,
  IsUUID,
  IsNotEmpty,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

// TODO add mixins like EmailField, PasswordField

export class ActivateParams {
  @ApiProperty({type: "ObjectID"})
  @IsNotEmpty()
  readonly userId!: string;

  @ApiProperty({type: "uuid"})
  @IsUUID()
  readonly activationToken!: string;
}

export class SignUpDto {
  @ApiProperty({example: "email@email.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({example: "password", minLength: 8})
  @MinLength(8)
  readonly password!: string;
}

export class LoginDto {
  @ApiProperty({example: "email@email.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({example: "password", minLength: 8})
  @MinLength(8)
  readonly password!: string;
}

export class ForgottenPasswordDto {
  @ApiProperty({example: "email@email.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({example: "email@email.com", maxLength: 255})
  @IsEmail()
  @MaxLength(255)
  readonly email!: string;

  @ApiProperty({type: "uuid"})
  @IsUUID()
  readonly passwordResetToken!: string;

  @ApiProperty({example: "password", minLength: 8})
  @MinLength(8)
  readonly password!: string;
}
