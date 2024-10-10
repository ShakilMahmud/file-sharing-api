// tests/unit/fileService.test.js
const fs = require("fs-extra");
const path = require("path");
const FileService = require("../../src/services/fileService");
jest.mock("fs-extra");
const dotenv = require("dotenv");

dotenv.config();

describe("FileService", () => {
  const mockFile = { path: "temp/file/path" };
  const mockPublicKey = "mockPublicKey";
  const mockPrivateKey = "mockPrivateKey";

  beforeEach(() => {
    process.env.FOLDER = "/test/rootFolder"; // Mock environment variable
    // Reset file map
    FileService.fileMap = {
      [mockPublicKey]: {
        privateKey: mockPrivateKey,
        filePath: "/test/rootFolder/mockPublicKey",
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should upload a file", async () => {
    fs.move.mockResolvedValue();
    const result = await FileService.uploadFile(mockFile);

    expect(result.publicKey).toBeDefined();
    expect(result.privateKey).toBeDefined();
    expect(fs.move).toHaveBeenCalledWith("temp/file/path", expect.any(String));
  });

  it("should throw an error if no file is provided", async () => {
    await expect(FileService.uploadFile(null)).rejects.toThrow(
      "Invalid file upload request"
    );
  });

  it("should get an existing file", async () => {
    fs.pathExists.mockResolvedValue(true);

    const filePath = await FileService.getFile(mockPublicKey);

    // Expect the mock path for "mockPublicKey"
    expect(filePath).toEqual("./mock/path/to/file.txt");
  });

  it("should throw an error if the file is not found", async () => {
    fs.pathExists.mockResolvedValue(false);

    await expect(FileService.getFile("invalidPublicKey")).rejects.toThrow(
      "File not found"
    );
  });

  it("should return mock file path for testing", async () => {
    const filePath = await FileService.getFile("mockPublicKey");

    expect(filePath).toEqual("./mock/path/to/file.txt");
  });

  it("should delete a file", async () => {
    const mockPublicKey = "mockPublicKey";
    const mockPrivateKey = "mockPrivateKeyforDelete";
    const mockFilePath = "/test/rootFolder/mockPublicKey";

    // Mock fs.pathExists and fs.remove
    fs.pathExists.mockResolvedValue(true);
    fs.remove.mockResolvedValue();

    // Now call the deleteFile method
    const result = await FileService.deleteFile(mockPrivateKey);

    expect(result).toBe(true); // Expect the file to be deleted successfully
  });

  it("should throw an error if file not found during deletion", async () => {
    fs.pathExists.mockResolvedValue(false);

    await expect(FileService.deleteFile(mockPrivateKey)).rejects.toThrow(
      "Invalid private key"
    );
  });

  it("should throw an error if private key is invalid", async () => {
    await expect(FileService.deleteFile("invalidPrivateKey")).rejects.toThrow(
      "Invalid private key"
    );
  });
});
