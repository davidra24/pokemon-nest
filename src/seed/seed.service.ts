import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities';
import { PokeResponse } from './interfaces/poke-response.interface';
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly httAdapter: AxiosAdapter<PokeResponse>,
  ) {}

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.httAdapter.get(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: CreatePokemonDto[] = [];

    //const insertPromisesArray: Promise<CreatePokemonDto>[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const num: number = +segments[segments.length - 2];
      ///this.pokemonModel.create({ num, name, url });
      //insertPromisesArray.push(this.pokemonModel.create({ num, name, url }));
      pokemonToInsert.push({ num, name, url });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}
