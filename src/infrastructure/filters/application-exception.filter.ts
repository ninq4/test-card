import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import type { Request, Response } from 'express';
import { ApplicationException } from '../../modules/shared/exceptions/application.exception';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      throw new GraphQLError(exception.message, {
        extensions: {
          code: exception.code,
        },
      });
    }

    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    response.status(exception.status).json({
      statusCode: exception.status,
      code: exception.code,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
