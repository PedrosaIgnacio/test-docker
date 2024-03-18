import { Controller, Post, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { Response, Request } from 'express';
import * as AuthService from '../../services/auth/auth.service';
import { authenticateUserSchema } from '../../validations/auth/authenticateUserSchema';
import { ErrorModel } from '../../helpers/errors';
import { ZodError } from 'zod';

@Controller('/auth')
@Service()

export default class AuthController {

    @Post('/token')
	async Authenticate(@Req() req: Request, @Res() res: Response) {
		try {
			const parsedBody = await authenticateUserSchema.parseAsync(req.body);
			const response = await AuthService.AuthenticateUser(parsedBody);

			return res.status(200).json(response);
            
		} catch (error) {
			if (error instanceof ZodError) {
				// Manejar el error de validacion de parámetros con un código de estado 400
				return new ErrorModel().newBadRequest('Invalid Parameters').send(res);
			}
			else if (error instanceof ErrorModel) {
				return error.send(res);
			}
		}
	}

}