import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from 'generated/prisma';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
@UseGuards(JwtGuard,RolesGuard)
@Controller('users')
export class UsersController {
   
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
        
    }
}


/*@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply JWT authentication first, then role-based authorization
export class AdminController {
  @Get('dashboard')
  @Roles(Role.ADMIN) // Only users with the ADMIN role can access this
  getAdminDashboard(): { message: string } {
    return { message: 'Admin Dashboard data' };
  }

  @Get('users')
  @Roles(Role.ADMIN) // Only admins can access this route
  getAdminUsers(): { users: string[] } {
    return { users: ['user1', 'user2'] };
  }

  @Get('public-info')
  // No @Roles() decorator, so access will only be controlled by JwtAuthGuard
  getPublicAdminInfo(): { message: string } {
    return { message: 'Public info within the admin controller (requires authentication)' };
  }

  @Get('editor-resource')
  @Roles(Role.ADMIN, Role.EDITOR) // Users with ADMIN or EDITOR role can access this
  getEditorResource(): { message: string } {
    return { message: 'Resource for admins and editors' };
  }
}
  */