import { code } from "./code";

describe("code", () => {
  it.each([
    ["Gandalf", 9001],
    ["Bilbo", 111],
  ])("should print 'Hello, %s!'", (name, age) => {
    console.log = jest.fn();
    code(name, age);
    expect(console.log).toHaveBeenCalledWith(
      `Hello, ${name}! You are ${age} years old.`,
    );
  });
});
