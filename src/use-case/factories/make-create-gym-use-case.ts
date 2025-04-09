import { createGymUseCase } from "../create-gym";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymRepository();
  const useCase = new createGymUseCase(gymsRepository);

  return useCase;
}
