import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./erros/invalid-credentials-error";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repostitory";
import { CheckInUseCase } from "./check-in";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
