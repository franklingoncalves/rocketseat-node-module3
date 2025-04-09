import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gym-repository";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
}
