import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { appDataSource } from "@shared/infra/typeorm/data-source";

let connection: DataSource;

describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await appDataSource.initialize();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin123", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should to be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin123",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});
