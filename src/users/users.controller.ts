import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('protected')
  get() {
    return { message: 'Ruta protegida solo adim puede ver esto' };
  }


  @Roles('admin', 'editor')
  @Get('profile')
  getProfile() {
    return { message: 'Ruta protegida ✅ (admin o editor)' };
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
