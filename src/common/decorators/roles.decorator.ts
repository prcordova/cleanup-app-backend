import { SetMetadata } from '@nestjs/common';

/**
 * Define os papéis (roles) permitidos para acessar um endpoint.
 * @param roles Lista de papéis permitidos, ex: ['client', 'worker'].
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
