import {describe, expect, it, vi} from "vitest";
import {buildJSON} from "./buildJSON.js";
import { hcrt_jsonld } from "./__mocks__/valid/hcrt_jsonld.js";
import fs from "fs";

describe("buildJSON", () => {
  it("throws error if no preferredNamespaceUri is provided", async () => {
    const filePath = "./src/publishToReconciliation/__mocks__/no_prefNamespace_hcrt.ttl"
    const ttlString = await fs.readFileSync(filePath).toString();  
    await expect(() => buildJSON(ttlString.toString(), "test")).rejects.toThrowError(/preferredNamespaceUri/i);
  })

  it("throws no error if no preferredNamespaceUri is provided", async () => {
    const filePath = "./src/publishToReconciliation/__mocks__/hcrt.ttl"
    const ttlString = await fs.readFileSync(filePath).toString();  
    const j = await buildJSON(ttlString.toString(), "test")
    expect(j).toEqual(hcrt_jsonld)
  })
});