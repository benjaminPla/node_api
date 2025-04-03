const userGet = require("../../../controllers/user/get").default;
const User = require("../../../models/user").default;

jest.mock("../../../models/user");

describe("userGet", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return users and a 200 status code", async () => {
    const mockUsers = [
      { id: 1, email: "user1@example.com" },
      { id: 2, email: "user2@example.com" },
    ];
    User.findAll = jest.fn().mockResolvedValue(mockUsers);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userGet(req, res);

    expect(User.findAll).toHaveBeenCalledWith({
      attributes: { exclude: ["password"] },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockUsers);
  });

  it("should return 404 if no users are found", async () => {
    User.findAll = jest.fn().mockResolvedValue([]);

    const req = {};
    const res = {
      sendStatus: jest.fn(),
    };

    await userGet(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  it("should return 500 if an unexpected error occurs", async () => {
    User.findAll = jest.fn().mockRejectedValue(new Error("Unexpected error"));

    const req = {};
    const res = {
      sendStatus: jest.fn(),
    };

    await userGet(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(500);
  });
});
