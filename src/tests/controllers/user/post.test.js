const bcrypt = require("bcrypt");
const userPost = require("../../../controllers/user/post").default;
const User = require("../../../models/user").default;

jest.mock("bcrypt");
jest.mock("../../../helpers");
jest.mock("../../../models/user");

describe("userPost", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should create a new user and return the user object", async () => {
    const email = "test@example.com";
    const password = "password123";
    const hashedPassword = "hashed_password";

    User.create = jest.fn().mockResolvedValue({
      email,
      password: hashedPassword,
    });

    bcrypt.hash = jest.fn().mockResolvedValue(hashedPassword);

    const req = { body: { email, password } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userPost(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(User.create).toHaveBeenCalledWith({
      email,
      password: hashedPassword,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      email,
      password: hashedPassword,
    });
  });

  it("should return 409 if user already exists", async () => {
    User.create = jest.fn().mockRejectedValue({
      name: "SequelizeUniqueConstraintError",
    });

    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      sendStatus: jest.fn(),
    };

    await userPost(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(409);
  });

  it("should return 500 if an unexpected error occurs", async () => {
    User.create = jest.fn().mockRejectedValue(new Error("Unexpected error"));

    const req = {
      body: { email: "test@example.com", password: "password123" },
    };
    const res = {
      sendStatus: jest.fn(),
    };

    await userPost(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
