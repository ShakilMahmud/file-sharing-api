// tests/integration/fileRoutes.test.js
const request = require("supertest");
const app = require("../../src/app");
const FileService = require("../../src/services/fileService");

jest.mock("../../src/services/fileService");

describe("File API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /files should upload a file and return keys", async () => {
    const fileBuffer = Buffer.from("Test file");
    const mockPublicKey = "mockPublicKey";
    const mockPrivateKey = "mockPrivateKey";

    FileService.uploadFile.mockResolvedValue({
      publicKey: mockPublicKey,
      privateKey: mockPrivateKey,
    });

    const res = await request(app)
      .post("/files")
      .attach("file", fileBuffer, "testfile.txt");

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("publicKey", mockPublicKey);
    expect(res.body).toHaveProperty("privateKey", mockPrivateKey);
  });

  test("GET /files/:publicKey should download a file", async () => {
    const mockFilePath = "/mock/path/to/file.txt";
    const mockPublicKey = "mockPublicKey";

    FileService.getFile.mockResolvedValue(mockFilePath);

    const res = await request(app).get(`/files/${mockPublicKey}`);

    expect(res.header["content-type"]).toContain("text/html");
  });

  test("GET /files/:publicKey should return 404 if file not found", async () => {
    FileService.getFile.mockRejectedValue(new Error("File not found"));

    const res = await request(app).get("/files/invalidKey");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "File not found");
  });

  test("DELETE /files/:privateKey should delete a file", async () => {
    FileService.deleteFile.mockResolvedValue();

    const res = await request(app).delete("/files/somePrivateKey");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "File deleted successfully");
  });

  test("DELETE /files/:privateKey should return 404 if file not found", async () => {
    FileService.deleteFile.mockRejectedValue(new Error("File not found"));

    const res = await request(app).delete("/files/invalidKey");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("error", "File not found");
  });
});
