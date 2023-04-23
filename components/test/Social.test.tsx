import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Social from "../Social";

describe("Social", () => {
  test("no post", () => {
    render(<Social hasPosts={false} />);
    expect(screen.queryByText(/posts/i)).toBeNull();
  });

  test("with post", () => {
    render(<Social hasPosts={true} />);
    expect(screen.queryByText(/posts/i)).toBeDefined();
  });
});
