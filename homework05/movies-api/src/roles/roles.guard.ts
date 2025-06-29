import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { RoleType } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // console.log('in the role guard');
    // console.log('='.repeat(10));

    const request = context.switchToHttp().getRequest();

    const [classRole, handlerRole] = this.reflector.getAll(Roles, [
      context.getClass(),
      context.getHandler(),
    ]);

    const decoratorRole = handlerRole || classRole;

    if (!decoratorRole) return true;

    const userRole = request.user.role as RoleType;

    // console.log('This is the decorator role', decoratorRole);
    // console.log('This is the user role', userRole);

    if (userRole !== decoratorRole) return false;
    console.log('this is req user:', request.user);
    return true;
  }
}
