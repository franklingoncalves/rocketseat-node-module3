import { searchGymUseCase } from "../search-gym";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";

export function makeSearchGymUseCaseUseCase() {
  const gymsRepository = new PrismaGymRepository();
  const useCase = new searchGymUseCase(gymsRepository);

  return useCase;
}
