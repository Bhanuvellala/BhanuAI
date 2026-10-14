import { describe, expect, it } from "vitest";
import { describeEmailjsError, MESSAGE_MIN_LENGTH, validateContact } from "@/lib/emailjs";

const valid = {
  name: "Jane Doe",
  email: "jane@company.com",
  subject: "Agentic RAG project",
  message: "I would like to talk about an agentic RAG build for our team.",
};

describe("validateContact", () => {
  it("accepts a well formed message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("treats subject as optional", () => {
    expect(validateContact({ ...valid, subject: "" })).toEqual({});
  });

  it("requires a name, an email and a message", () => {
    const errors = validateContact({ name: " ", email: "", subject: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it.each(["not-an-email", "jane@", "@company.com", "jane@company", "jane doe@company.com"])(
    "rejects %s",
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBeDefined();
    },
  );

  it.each(["jane@company.com", "jane.doe+tag@sub.company.co.uk"])("accepts %s", (email) => {
    expect(validateContact({ ...valid, email }).email).toBeUndefined();
  });

  it("rejects a message shorter than the minimum", () => {
    expect(validateContact({ ...valid, message: "a".repeat(MESSAGE_MIN_LENGTH - 1) }).message)
      .toBeDefined();
  });

  it("rejects over-long input", () => {
    expect(validateContact({ ...valid, name: "a".repeat(101) }).name).toBeDefined();
    expect(validateContact({ ...valid, subject: "a".repeat(151) }).subject).toBeDefined();
    expect(validateContact({ ...valid, message: "a".repeat(5001) }).message).toBeDefined();
  });

  it("ignores surrounding whitespace", () => {
    expect(validateContact({ ...valid, name: "  Jane  ", email: "  jane@company.com  " })).toEqual({});
  });
});

describe("describeEmailjsError", () => {
  it("explains a rate limit", () => {
    expect(describeEmailjsError({ status: 429 })).toMatch(/too many/i);
  });

  it("explains a configuration problem", () => {
    expect(describeEmailjsError({ status: 400 })).toMatch(/configuration/i);
  });

  it("explains a server fault", () => {
    expect(describeEmailjsError({ status: 503 })).toMatch(/trouble/i);
  });

  it("falls back to a generic message for anything unknown", () => {
    expect(describeEmailjsError(new Error("boom"))).toMatch(/something went wrong/i);
  });

  it("never leaks the raw error text to the visitor", () => {
    expect(describeEmailjsError({ status: 400, text: "service_abc123 not found" })).not.toContain(
      "service_abc123",
    );
  });
});
