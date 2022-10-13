/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import {buildUrl} from "./networking";

test("Test buildUrl function", async () => {

  expect(buildUrl("test",{query:"Harry", page:1},false)).toBe("https://api.themoviedb.org/3/test/?query=Harry&page=1");
});
