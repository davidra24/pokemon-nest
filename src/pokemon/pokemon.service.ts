import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
  ) {}

  //@HttpCode(HttpStatus.CREATED)
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      if (createPokemonDto.name)
        createPokemonDto.name = createPokemonDto.name.toLowerCase();
      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ num: term });

    if (!pokemon && isValidObjectId(term))
      pokemon = await this.pokemonModel.findById(term);

    if (!pokemon) pokemon = await this.pokemonModel.findOne({ name: term });

    if (!pokemon)
      throw new NotFoundException(
        `Pokemon con el término de busqueda ${term} no encontrado`,
      );

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon: Pokemon = await this.findOne(term);
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(_id: string) {
    //return await this.pokemonModel.findByIdAndDelete(id);
    /* const pokemon: Pokemon = await this.findOne(id);
    return await pokemon.deleteOne(); */
    const result = await this.pokemonModel.deleteOne({ _id });
    const { deletedCount } = result;
    if (deletedCount === 0)
      throw new NotFoundException(`Pokémon con el id: ${_id} no existe`);
    return { status: HttpStatus.OK, data: result };
  }

  private handleException(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(`No se puede reemplazar el pokemon`);

    throw new InternalServerErrorException(`No se pudo crear un pokémon`);
  }
}
