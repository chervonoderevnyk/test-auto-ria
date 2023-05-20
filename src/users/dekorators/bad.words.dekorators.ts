import { registerDecorator, ValidationOptions } from 'class-validator';
import BadWordsFilter from 'bad-words';

export const IsWalidWords = (validationOptions?: ValidationOptions) => {
  return (object, propertyName) => {
    registerDecorator({
      name: 'EditingWords',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: {
        message: 'Learn to speak well !!!',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          const regex = /^(?!.*\bfuck\b).*$/;
          return typeof value === 'string' && regex.test(value);
        },
      },
    });
  };
};
