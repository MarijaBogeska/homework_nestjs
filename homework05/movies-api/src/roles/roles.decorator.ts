import { Reflector } from '@nestjs/core';
import { RoleType } from './role.enum';

export const Roles = Reflector.createDecorator<RoleType>();
