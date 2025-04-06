import { expect, describe, it, beforeEach } from "vitest";
import { createGymUseCase } from "./create-gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: InMemoryGymRepository;
let sut: createGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new createGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
