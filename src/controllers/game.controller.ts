import { Controller, Get, Post, Delete, Route, Path, Body, Tags, Patch } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { ReviewDTO } from "../dto/review.dto";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }

  @Get("{id}")
  public async getConsoleById(@Path() id: number): Promise<GameDTO | null> {
    return gameService.getGameById(id);
  }

  @Post("/")
  public async createGame(
    @Body() requestBody: GameDTO
  ): Promise<GameDTO> {
    const { title,console_id } = requestBody;
    return gameService.createGame(title, console_id);
  }

  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }

  // Met à jour une console par ID
  @Patch("{id}")
  public async updateGame(
    @Path() id: number,
    @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const { title, console_id } = requestBody;
    return gameService.updateGame(id, title, console_id);
  }

  @Get("{id}/reviews")
  public async getGamesByConsoleId(@Path() id: number): Promise<ReviewDTO[]> {
    return gameService.getReviewsByGameId(id);
  }
}