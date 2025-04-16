import { Injectable, Logger } from '@nestjs/common';
import { Developer } from 'generated/prisma';
import { DatabaseService } from 'src/database/databse.service';
import { CategoryDto, DeveloperDto, GameDto, GenreDto } from './dto';

@Injectable()
export class GamesService {
    constructor(private prisma: DatabaseService) { }
    private readonly logger = new Logger(GamesService.name);
    // developers
    async createDeveloper(name: DeveloperDto) {
        const check = await this.prisma.developer.findUnique({
            where: {
                name: name.name
            }
        });
        if (check !== null) {
            this.logger.error('Developer already exists');
            throw new Error('Developer already exists');
        }
        const normalize_name = name.name.toUpperCase();
        const developer = await this.prisma.developer.create({
            data: {
                name: normalize_name,
            }
        });
        this.logger.log('Developer created');
        return developer;
    }
    async getAllDevelopers(): Promise<Developer[]> {
        const developers = await this.prisma.developer.findMany();
        return developers;
    }
    async getDeveloperById(id: string): Promise<Developer> {
        const developer = await this.prisma.developer.findUnique({
            where: {
                id: id
            }
        });
        if (!developer) {
            this.logger.error('Developer not found');
            throw new Error('Developer not found');
        }
        return developer;
    }
    async updateDeveloper(id: string, name: DeveloperDto): Promise<Developer> {
        const normalize_name = name.name.toUpperCase();
        const developer = await this.prisma.developer.update({
            where: {
                id: id
            },
            data: {
                name: normalize_name,
            }
        });
        this.logger.log('Developer updated');
        return developer;
    }
    async deleteDeveloper(id: string): Promise<Developer> {
        const developer = await this.prisma.developer.delete({
            where: {
                id: id
            }
        });
        this.logger.log('Developer deleted');
        return developer;
    }
    // genre
    async createGenre(name: GenreDto) {
        const check = await this.prisma.genre.findUnique({
            where: {
                name: name.name
            }
        });
        if (check !== null) {
            this.logger.error('Genre already exists');
            throw new Error('Genre already exists');
        }
        const normalize_name = name.name.toUpperCase();
        const genre = await this.prisma.genre.create({
            data: {
                name: normalize_name,
            }
        });
        this.logger.log('Genre created');
        return genre;
    }
    async getAllGenres() {
        const genres = await this.prisma.genre.findMany();
        return genres;
    }
    async getGenreById(id: string) {
        const genre = await this.prisma.genre.findUnique({
            where: {
                id: id
            }
        });
        if (!genre) {
            this.logger.error('Genre not found');
            throw new Error('Genre not found');
        }
        return genre;
    }
    async updateGenre(id: string, name: GenreDto) { 
        const normalize_name = name.name.toUpperCase();
        const genre = await this.prisma.genre.update({
            where: {
                id: id
            },
            data: {
                name: normalize_name,
            }
        });
        this.logger.log('Genre updated');
        return genre;
    }
    async deleteGenre(id: string) {
        const genre = await this.prisma.genre.delete({
            where: {
                id: id
            }
        });
        this.logger.log('Genre deleted');
        return genre;
    }


    // categories
    async createCategory(name: CategoryDto) {
        const normalize_name = name.name.toUpperCase();
        const check = await this.prisma.category.findUnique({
            where: {
                name: name.name
            }
        });
        if (check !== null) {
            this.logger.error('Category already exists');
            throw new Error('Category already exists');
        }
        const category = await this.prisma.category.create({
            data: {
                name: normalize_name,
            }
        });
        this.logger.log('Category created');
        return category;
    }
    async getAllCategories() {
        const categories = await this.prisma.category.findMany();
        return categories;
    }
    async getCategoryById(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id: id
            }
        });
        if (!category) {
            this.logger.error('Category not found');
            throw new Error('Category not found');
        }
        return category;
    }
    async updateCategory(id: string, name: CategoryDto) {
        const normalize_name = name.name.toUpperCase();
        const category = await this.prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: normalize_name,
            }
        });
        this.logger.log('Category updated');
        return category;
    }
    async deleteCategory(id: string) {
        const category = await this.prisma.category.delete({
            where: {
                id: id
            }
        });
        this.logger.log('Category deleted');
        return category;
    }

    // games
    async createGame(game: GameDto) {
        const check = await this.prisma.game.findUnique({
            where: {
                name: game.name
            }
        });
        if (!!check) {
            this.logger.error('Game already exists');
            throw new Error('Game already exists');
        }
      
        const savedGame = await this.prisma.game.create({
            data: {
                name: game.name,
                description: game.description,
                image: game.image,
                developer: {
                    connect: {
                        id: game.developer
                    }
                },
                category: {
                    connect: {
                        id: game.category
                    }
                },
                genre: {
                    connect: {
                        id: game.genre
                    }
                },
                cpu: game.cpu,
                ram: game.ram,
                price: game.price
            }
        });
        this.logger.log('Game created');
        return savedGame;
    }
    async getAllGames() {
        const games = await this.prisma.game.findMany({
            include: {
                developer: true,
                category: true,
                genre: true
            }
        });
        return games;
    }
    async getGameById(id: string) {
        const game = await this.prisma.game.findUnique({
            where: {
                id: id
            },
            include: {
                developer: true,
                category: true,
                genre: true
            }
        });
        if (!game) {
            this.logger.error('Game not found');
            throw new Error('Game not found');
        }
        return game;
    }
    async updateGame(id: string, game: GameDto) {
        const check = await this.prisma.game.findUnique({
            where: {
                id: id
            }
        });
        if (!check) {
            this.logger.error('Game not found');
            throw new Error('Game not found');
        }
    
        const updatedGame = await this.prisma.game.update({
            where: {
                id: id
            },
            data: {
                name:game.name,
                description: game.description,
                image: game.image,
                developer: {
                    connect: {
                        id: game.developer
                    }
                },
                category: {
                    connect: {
                        id: game.category
                    }
                },
                genre: {
                    connect: {
                        id: game.genre
                    }
                },
                cpu: game.cpu,
                ram: game.ram,
                price: game.price
            }
        });
        this.logger.log('Game updated');
        return updatedGame;
    }
    async deleteGame(id: string) {
        const game = await this.prisma.game.delete({
            where: {
                id: id
            }
        });
        this.logger.log('Game deleted');
        return game;
    }

}
