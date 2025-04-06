import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";
import { hash } from "bcryptjs";

interface createGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface createGymUseCaseResponse {
  gym: Gym;
}

export class createGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: createGymUseCaseRequest): Promise<createGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
