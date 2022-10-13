/* eslint-disable no-undef */
import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import MoviesList from "./";

test("Test main page", async () => {
  render(<MoviesList />);

  expect(screen.getByTestId("search-bar")).toBeVisible();
});
