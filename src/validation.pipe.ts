import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
/**
 * value 는 현재 파이프에 전달된 인수
 * metadata 는 현재 파이프에 전달된 인수의 메타데이터
 *  - type: 파이프에 전달된 인수가 body, query, param, custom 인지를 나타냄
 *  - metatype: 라우트 핸들러에 정의된 인수의 타입
 *  - data: 데코레이터에 전달된 문자열 = 매개변수 이름
 */
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 전달된 metatype이 파이프가 지원하는 타입인지 검사
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // plainToClass : 순수 자바스크립트 객체를 클래스 객체로 변경
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  // transform(value: any, metadata: ArgumentMetadata) {
  //   console.log(metadata);
  //   return value;
  // }
}
