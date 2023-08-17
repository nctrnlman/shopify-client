import React from "react";
import ProductAdminContent from "../components/Admins/Products/ProductAdminContent";
import NavbarDashboard from "../components/Admins/Navbar/NavbarDashboard";

function ProductsAdmin() {
  return (
    <div>
      <NavbarDashboard />
      <ProductAdminContent />
    </div>
  );
}

export default ProductsAdmin;
