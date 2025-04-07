import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface SearchUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<SearchUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
