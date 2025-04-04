import { User, Prisma } from "@prisma/client";
import { Usersrepository } from "../users-repository";

export class InMemoryUsersRepository implements Usersrepository {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: "user-1", // Você pode querer implementar uma lógica para gerar IDs únicos
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);
    return user;
  }
}
