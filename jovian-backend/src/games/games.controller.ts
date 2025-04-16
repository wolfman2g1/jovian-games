import { Controller, Post,Body, HttpCode, Get, Put, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { DeveloperDto, CategoryDto,GameDto, GenreDto } from './dto';


@Controller('games')
export class GamesController {
    // developer
    constructor(private gamesService: GamesService) { }
    @HttpCode(201)
    @Post('developer')
    async createDeveloper(@Body() developer: DeveloperDto) {
        return this.gamesService.createDeveloper(developer);
    }
    @HttpCode(200)
    @Get('developer')
    async getAllDevelopers() {
        return this.gamesService.getAllDevelopers();
    }
    @HttpCode(200)
    @Get('developer/:id')
    async getDeveloperById(@Body('id') id: string) {
        return this.gamesService.getDeveloperById(id);
    }
    @HttpCode(200)
    @Put('developer/:id')
    async updateDeveloper(@Body('id') id: string, @Body() developer: DeveloperDto) {
        return this.gamesService.updateDeveloper(id, developer);
    }
    @HttpCode(204)
    @Delete('developer/:id')
    async deleteDeveloper(@Body('id') id: string) {
        return this.gamesService.deleteDeveloper(id);
    }
    // category
    @HttpCode(201)
    @Post('category')
    async createCategory(@Body() category: CategoryDto) {
        return this.gamesService.createCategory(category);
    }
    @HttpCode(200)
    @Get('category')
    async getAllCategories() {
        return this.gamesService.getAllCategories();
    }
    @HttpCode(200)
    @Get('category/:id')
    async getCategoryById(@Body('id') id: string) {
        return this.gamesService.getCategoryById(id);
    }
    @HttpCode(200)
    @Put('category/:id')
    async updateCategory(@Body('id') id: string, @Body() category: CategoryDto) {
        return this.gamesService.updateCategory(id, category);
    }
    @HttpCode(204)
    @Delete('category/:id')
    async deleteCategory(@Body('id') id: string) {
        return this.gamesService.deleteCategory(id);
    }
    //genre
    @HttpCode(201)
    @Post('genre')
    async createGenre(@Body() genre: GenreDto) {
        return this.gamesService.createGenre(genre);
    }
    @HttpCode(200)
    @Get('genre')
    async getAllGenres() {
        return this.gamesService.getAllGenres();
    }
    @HttpCode(200)
    @Get('genre/:id')
    async getGenreById(@Body('id') id: string) {
        return this.gamesService.getGenreById(id);
    }
    @HttpCode(200)
    @Put('genre/:id')
    async updateGenre(@Body('id') id: string, @Body() genre: GenreDto) {
        return this.gamesService.updateGenre(id, genre);
    }
    @HttpCode(204)
    @Delete('genre/:id')
    async deleteGenre(@Body('id') id: string) {
        return this.gamesService.deleteGenre(id);
    }

    // game
    @HttpCode(201)
    @Post('game')
    async createGame(@Body() game: GameDto) {
        return this.gamesService.createGame(game);
    }
    @HttpCode(200)
    @Get('game')
    async getAllGames() {
        return this.gamesService.getAllGames();
    }
    @HttpCode(200)
    @Get('game/:id')
    async getGameById(@Body('id') id: string) {
        return this.gamesService.getGameById(id);
    } 
    @HttpCode(200)
    @Put('game/:id')
    async updateGame(@Body('id') id: string, @Body() game: GameDto) {
        return this.gamesService.updateGame(id, game);
    }
    @HttpCode(204)
    @Delete('game/:id')
    async deleteGame(@Body('id') id: string) {
        return this.gamesService.deleteGame(id);
    }
}
