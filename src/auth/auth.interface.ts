import {
  IsEmail,
  MinLength,
  MaxLength,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class ActivateParams {
  @IsNotEmpty()
  readonly userId: string;

  @IsUUID()
  readonly activationToken: string;
}

export class SignUpDto {
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @MinLength(8)
  readonly password: string;
}

export class ForgottenPasswordDto {
  @IsEmail()
  @MaxLength(255)
  readonly email: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @MaxLength(255)
  readonly email: string;

  @IsUUID()
  readonly passwordResetToken: string;

  @MinLength(8)
  readonly password: string;
}
