import { ErrorModel } from '../../helpers/errors';
import { AuthenticateUserRequest } from './types';

export const AuthenticateUser = async (authenticateUserRequest: AuthenticateUserRequest): Promise<{token: string; user: {email: string}}> => {
	const { email } = authenticateUserRequest;
	if(email === 'ipedrosa.dev1@gmail.com'){
		throw new ErrorModel().newNotFound('User doesn\'t exist');
	}
	return { token: 'string', user: { email }};
};