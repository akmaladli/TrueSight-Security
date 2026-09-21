import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/App";

describe("TrueSight security app", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists login state and updates the dashboard when devices change", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByRole("heading", { name: /security dashboard/i }),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem("truesight-auth")).toBe("true");

    fireEvent.click(
      screen.getByRole("button", { name: /toggle backyard sensor/i }),
    );

    expect(screen.getByText(/2 devices offline/i)).toBeInTheDocument();
  });

  it("updates the device view when the navigation is clicked", async () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await screen.findByRole("heading", { name: /security dashboard/i });

    fireEvent.click(screen.getByRole("button", { name: /alerts/i }));

    expect(
      screen.getByRole("heading", { name: /alerts/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/window lock system/i)).toBeInTheDocument();
  });
});
