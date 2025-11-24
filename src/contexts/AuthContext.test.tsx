import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it("should initialize with no user", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should register a new user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    let registered = false;
    await act(async () => {
      registered = await result.current.register(
        "test@example.com",
        "password123",
        "Test User"
      );
    });

    expect(registered).toBe(true);
  });

  it("should not register duplicate email", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register("test@example.com", "password123", "Test User");
    });

    let secondRegistration = false;
    await act(async () => {
      secondRegistration = await result.current.register(
        "test@example.com",
        "password456",
        "Another User"
      );
    });

    expect(secondRegistration).toBe(false);
  });

  it("should login with correct credentials", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register("test@example.com", "password123", "Test User");
    });

    let loginSuccess = false;
    await act(async () => {
      loginSuccess = await result.current.login("test@example.com", "password123");
    });

    expect(loginSuccess).toBe(true);
    expect(result.current.user?.email).toBe("test@example.com");
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("should fail login with incorrect credentials", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register("test@example.com", "password123", "Test User");
    });

    let loginSuccess = false;
    await act(async () => {
      loginSuccess = await result.current.login("test@example.com", "wrongpassword");
    });

    expect(loginSuccess).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should logout user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register("test@example.com", "password123", "Test User");
      await result.current.login("test@example.com", "password123");
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
