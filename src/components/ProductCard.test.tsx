import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "./ProductCard";
import { CartProvider } from "@/contexts/CartContext";

const mockProduct = {
  id: 1,
  name: "Test Product",
  price: 99.99,
  image: "https://example.com/test.jpg",
  category: "test",
  description: "Test product description",
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <CartProvider>{children}</CartProvider>
  </BrowserRouter>
);

describe("ProductCard", () => {
  it("should render product information", () => {
    const { getByText } = render(<ProductCard product={mockProduct} />, { wrapper });

    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("$99.99")).toBeInTheDocument();
    expect(getByText("Test product description")).toBeInTheDocument();
  });

  it("should render product image", () => {
    const { getByAltText } = render(<ProductCard product={mockProduct} />, { wrapper });

    const image = getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/test.jpg");
  });

  it("should have size selection", () => {
    const { getByText } = render(<ProductCard product={mockProduct} />, { wrapper });

    expect(getByText("Size")).toBeInTheDocument();
  });

  it("should have Add to Cart button", () => {
    const { getByText } = render(<ProductCard product={mockProduct} />, { wrapper });

    const addButton = getByText("Add to Cart");
    expect(addButton).toBeInTheDocument();
  });

  it("should have View Details button", () => {
    const { getByText } = render(<ProductCard product={mockProduct} />, { wrapper });

    const viewButton = getByText("View Details");
    expect(viewButton).toBeInTheDocument();
  });
});
