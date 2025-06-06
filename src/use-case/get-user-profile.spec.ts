import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repositoty";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./erros/resource-not-found-error";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johm@mail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("John Doe");
  });

  it("should not able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
