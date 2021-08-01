const mongoose = require("mongoose");

const DBManager = require("./db-handler");
const accountService = require("../src/services/account");
const UserModel = require("../src/models/UserModel");
const isRegisterValid = require("../src/validation/account.validation");

const dbman = new DBManager();

afterAll(async () => await dbman.stop());
beforeAll(async () => await dbman.start());
afterEach(async () => await dbman.cleanup());

describe("account ", () => {
  /**
   * Tests that a valid account can be created through the accountService without throwing any errors.
   */
  it("can be created correctly", async () => {
    const data = await accountService.register(accountComplete);
    expect(data.status).toBe(200);
  });

  it("can be logged in successfully",async ()=>{
    const data = await accountService.login(accountComplete); 
    expect(data.status).toBe(200);
  })

  it("cannot be logged in successfully",async ()=>{
    const data = await accountService.login(accountCompeletePwdError);
    expect(data.status).toBe(201);
  })
});

test("validate register to be true", () => {
  expect(isRegisterValid(accountComplete)).toBe(true);
});

test("validate register to be false", ()=>{
    expect(isRegisterValid(accountIncomplete)).toBe(false);
});

test("encrypt password correct", ()=>{
  expect(accountService.encrypt("abbccddaad1")===accountService.encrypt("abbccddaad1")).toBe(true);
});

test("encrypt password inccorect", ()=>{
  expect(accountService.encrypt("abbccddaad1")===accountService.encrypt("abbccdda1aad1")).toBe(false);
})


const accountComplete = {
  username: "12222",
  password: "offfaa",
};
const accountCompeletePwdError={
  username: "12222",
  password: "offaa",
};

const accountIncomplete = {
    username: "1",
    password: "offaa",
  };
  
