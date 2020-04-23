import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseOptionalBoolPipe implements PipeTransform<string | boolean | undefined, boolean | undefined> {
  transform(value) {
    if (value === undefined) { return undefined }
    if (value === false || value === 'false') { return false }
    if (value === true || value === 'true') { return true }
    throw new BadRequestException('Validation failed (boolean string is expected)')
  }
}
