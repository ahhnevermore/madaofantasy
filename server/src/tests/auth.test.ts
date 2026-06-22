import "../utils/env.js";
import { buildApp } from "../app.js";
import { describe, test, expect } from "vitest";

describe("auth flow", () => {
  test("auth routes", async () => {
    const app = buildApp();

    await app.ready();

    await app.prisma.user.deleteMany();
    await app.prisma.session.deleteMany();
    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    });
    const token = registerResponse.cookies.find((v) => v.name == "session")?.value;

    const meResponse = await app.inject({
      method: "GET",
      url: "api/v1/auth/me",
      cookies: {
        session: token!,
      },
    });

    expect(meResponse.statusCode).toBe(200);

    const logoutResponse = await app.inject({
      method: "POST",
      url: "api/v1/auth/logout",
      cookies: {
        session: token!,
      },
    });
    expect(logoutResponse.statusCode).toBe(200);
    const meAfterLogout = await app.inject({
      method: "GET",
      url: "/api/v1/auth/me",
      cookies: {
        session: token!,
      },
    });

    expect(meAfterLogout.statusCode).toBe(401);

    const loginResponse = await app.inject({
      method: "POST",
      url: "api/v1/auth/login",
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    });
    const loginToken = loginResponse.cookies.find((v) => v.name == "session")?.value;

    const meResponse2 = await app.inject({
      method: "GET",
      url: "api/v1/auth/me",
      cookies: {
        session: loginToken!,
      },
    });

    expect(meResponse2.statusCode).toBe(200);

    await app.close();
  });

  test("cannot access /me without session", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/auth/me",
    });

    expect(response.statusCode).toBe(401);

    await app.close();
  });

  test("cannot access /me with invalid session", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "GET",
      url: "/api/v1/auth/me",
      cookies: {
        session: "not-a-real-session",
      },
    });

    expect(response.statusCode).toBe(401);

    await app.close();
  });

  test("logout invalidates session", async () => {
    const app = buildApp();
    await app.ready();

    await app.prisma.session.deleteMany();
    await app.prisma.user.deleteMany();

    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    });

    const token = registerResponse.cookies.find((c) => c.name === "session")?.value;

    expect(token).toBeDefined();

    const logoutResponse = await app.inject({
      method: "POST",
      url: "/api/v1/auth/logout",
      cookies: {
        session: token!,
      },
    });

    expect(logoutResponse.statusCode).toBe(200);

    const meResponse = await app.inject({
      method: "GET",
      url: "/api/v1/auth/me",
      cookies: {
        session: token!,
      },
    });

    expect(meResponse.statusCode).toBe(401);

    await app.close();
  });

  test("cannot login with wrong password", async () => {
    const app = buildApp();
    await app.ready();

    await app.prisma.session.deleteMany();
    await app.prisma.user.deleteMany();

    await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      body: {
        email: "test@example.com",
        password: "wrongpassword",
      },
    });

    expect(response.statusCode).toBe(401);

    await app.close();
  });

  test("cannot login with unknown email", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      body: {
        email: "doesnotexist@example.com",
        password: "secret123",
      },
    });

    expect(response.statusCode).toBe(401);

    await app.close();
  });

  test("register rejects invalid email", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "not-an-email",
        password: "secret123",
      },
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });

  test("register rejects missing password", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "test@example.com",
      },
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });

  test("register rejects empty body", async () => {
    const app = buildApp();
    await app.ready();

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {},
    });

    expect(response.statusCode).toBe(400);

    await app.close();
  });

  test("cannot register duplicate email", async () => {
    const app = buildApp();
    await app.ready();

    await app.prisma.session.deleteMany();
    await app.prisma.user.deleteMany();

    await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/api/v1/auth/register",
      body: {
        email: "test@example.com",
        password: "secret123",
      },
    });

    expect(response.statusCode).toBe(409);

    await app.close();
  });
});
