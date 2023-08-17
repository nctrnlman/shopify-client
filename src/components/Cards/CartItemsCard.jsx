import React from "react";

function CartItemsCard({ item, formattedPrice }) {
  return (
    <div className="flex flex-row items-center gap-5">
      <img
        src={`https://shopify-be-git-main-nctrnlman.vercel.app/${item.image_url}`}
        alt={item.name}
        className="w-24 h-24 lg:w-36 lg:h-36 object-cover mr-2"
      />
      <div>
        <p className="text-sm uppercase lg:text-lg font-semibold">
          {item.name}
        </p>
        <p className="text-sm lg:text-lg text-gray-500">
          Price: {formattedPrice(item.price)}
        </p>
      </div>
    </div>
  );
}

export default CartItemsCard;
