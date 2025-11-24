import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.cart).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = {
      id: 1,
      name: "Test Product",
      price: 99.99,
      image: "test.jpg",
      category: "test",
      description: "Test description",
    };

    act(() => {
      result.current.addToCart(product, "M");
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].name).toBe("Test Product");
    expect(result.current.cart[0].size).toBe("M");
    expect(result.current.getTotalItems()).toBe(1);
  });

  it("should update quantity when adding same product with same size", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = {
      id: 1,
      name: "Test Product",
      price: 99.99,
      image: "test.jpg",
      category: "test",
      description: "Test description",
    };

    act(() => {
      result.current.addToCart(product, "M");
      result.current.addToCart(product, "M");
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.getTotalItems()).toBe(2);
  });

  it("should calculate total price correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product1 = {
      id: 1,
      name: "Product 1",
      price: 50,
      image: "test.jpg",
      category: "test",
      description: "Test",
    };

    const product2 = {
      id: 2,
      name: "Product 2",
      price: 30,
      image: "test.jpg",
      category: "test",
      description: "Test",
    };

    act(() => {
      result.current.addToCart(product1, "M");
      result.current.addToCart(product2, "L");
    });

    expect(result.current.getTotalPrice()).toBe(80);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = {
      id: 1,
      name: "Test Product",
      price: 99.99,
      image: "test.jpg",
      category: "test",
      description: "Test",
    };

    act(() => {
      result.current.addToCart(product, "M");
    });

    expect(result.current.cart).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(1, "M");
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it("should clear cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    const product = {
      id: 1,
      name: "Test Product",
      price: 99.99,
      image: "test.jpg",
      category: "test",
      description: "Test",
    };

    act(() => {
      result.current.addToCart(product, "M");
      result.current.addToCart(product, "L");
    });

    expect(result.current.cart).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
