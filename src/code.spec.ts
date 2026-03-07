import { code } from './code';

describe("code", () => {
  it("should print 'Hello, world!'", () => {
    console.log = jest.fn();
    code("Gandalf", 9001);
    expect(console.log).toHaveBeenCalledWith("Hello, Gandalf! You are 9001 years old.");
  });
});