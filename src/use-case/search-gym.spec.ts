import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { searchGymUseCase } from "./search-gym";

let gymsRepository: InMemoryGymRepository;
let sut: searchGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new searchGymUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javacript Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await gymsRepository.create({
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    const { gyms } = await sut.execute({
      query: "Javacript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Javacript Gym" })]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javacript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.0747279,
        longitude: -49.4889672,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javacript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javacript Gym 21" }),
      expect.objectContaining({ title: "Javacript Gym 22" }),
    ]);
  });
});
