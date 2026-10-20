import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, Kind, type ValueNode } from 'graphql';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function parseDate(value: string): Date {
  const date = new Date(value);

  if (!DATE_PATTERN.test(value) || Number.isNaN(date.getTime())) {
    throw new GraphQLError(
      `Дата должна быть в формате YYYY-MM-DD, сейчас "${value}"`,
    );
  }

  return date;
}

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new GraphQLError('Дата скаляр может обрабатывать только Date');
    }

    return value.toISOString().slice(0, 10);
  }

  parseValue(value: unknown): Date {
    if (typeof value !== 'string') {
      throw new GraphQLError('Дата должна быть строкой');
    }

    return parseDate(value);
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Дата должна быть строкой');
    }

    return parseDate(ast.value);
  }
}
