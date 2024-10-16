import { GameDTO } from "../dto/game.dto";
import { ReviewFound } from "../error/ExistingError";
import { notFound, notFoundConsole } from "../error/NotFoundError";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { Review } from "../models/review.model";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async getGameById(id: number): Promise<Game | null> {
    const game = await Game.findByPk(id);
    if(game){
      return game;
    }else{
      notFound(id.toString());
    }
  }

  public async createGame(
    title: string,
    console_id: number,
  ): Promise<Game> {
    const console = await Console.findByPk(console_id);
    if(console){
      return Game.create({title: title, console_id: console_id });
    }else{
      notFoundConsole(console_id.toString());
    }
  }

  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    if (game) {
      const reviews = await Review.findAll({ where: { game_id: game.id } });
      if (reviews.length > 0) {
        ReviewFound("Reviews");
      }
      await game?.destroy();
    } else {
      notFound(id.toString());
    }
  }

  public async updateGame(
    id: number,
    title: string,
    console_id: number,
  ): Promise<Game | null> {
    const game = await Game.findByPk(id);
    const console = await Console.findByPk(console_id)
    if (game) {
      if(console){
        if (title) game.title = title;
        if (console_id) game.console_id = console_id;
        await game.save();
        return game;
      }else{
        notFoundConsole(console_id.toString())
      }
    }
    notFound(id.toString());
  }

  public async getReviewsByGameId(id: number): Promise<Review[]> {
    const game = await Game.findByPk(id);
    if (!game) {
      notFound(id.toString());
    }
    return Review.findAll({ where: { game_id: id } });
  }
}

export const gameService = new GameService();
