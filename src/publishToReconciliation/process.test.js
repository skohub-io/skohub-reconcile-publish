import { beforeEach, describe, expect, it, vi } from "vitest";
import { process } from "./process.js";
import * as handleData from "./handleData.js";
import { writeLog } from "./writeLog.js";

vi.mock("./handleData.js", () => {
  return {
    parseFile: vi.fn(),
    sendData: vi.fn(),
    deleteData: vi.fn(),
  };
});

vi.mock("./writeLog.js", () => {
  return {
    writeLog: vi.fn(),
  };
});

const mockedHandleData = vi.mocked(handleData);
const mockedLog = vi.mocked(writeLog);

describe("process", () => {
  beforeEach(() => {
    mockedHandleData.parseFile.mockReset();
    mockedHandleData.sendData.mockReset();
    mockedHandleData.deleteData.mockReset();
  });
  it("throws error if file parsing fails", async () => {
    mockedHandleData.parseFile.mockRejectedValueOnce(new Error("error"));
    await expect(() => process("filePath", {})).rejects.toThrowError(/error/i);
    expect(writeLog).toHaveBeenCalled()
  })


  it("throws error if responseDeleted has failures", async () => {
    mockedHandleData.parseFile.mockResolvedValueOnce([
      { account: "account", dataset: "dataset", entries: [] },
    ]);
    mockedHandleData.deleteData.mockResolvedValueOnce({
      failures: ["failure"],
    });
    await expect(() => process("filePath", {})).rejects.toThrowError(
      /deleteData/i
    );
    expect(writeLog).toHaveBeenCalled()

  });

  it("throws error if responseDeleted has no property 'failures'", async () => {
    mockedHandleData.parseFile.mockResolvedValueOnce([
      { account: "account", dataset: "dataset", entries: [] },
    ]);
    mockedHandleData.deleteData.mockResolvedValueOnce({});
    await expect(() => process("filePath", {})).rejects.toThrowError();
    expect(writeLog).toHaveBeenCalled()
  });

  
});
