// Lo unico que hay que hacer es importar el injecto de nestjs/commoon

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class localAuthGuard extends AuthGuard('local'){}