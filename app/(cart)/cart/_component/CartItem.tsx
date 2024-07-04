import { CartItems, useCart } from "@/hooks/use-cart";
import { priceFormater } from "@/lib/format";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { ActionButton } from "./action-btn";
interface CartItemProps {
  product: CartItems;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const cart = useCart();
  const { price, quantity, name, images, id } = product;
  const onRemove = () => {
    cart.removeItem(id);
  };
  const incrementProductQuantity = () => {
    cart.incrementSize(id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={images[0].imageUrl}
          alt={name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute  z-10 cursor-pointer right-0 top-0  ">
          <ActionButton
            onClick={onRemove}
            icon={<X className="w-4 h-4" />}
            className="w-6 h-6"
            variant="outline"
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-foreground">{name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            {/* <p className="text-gray-500">{data.color.name}</p> */}
            <div className="flex items-center gap-x-2">
              <ActionButton
                disabled={quantity == 1}
                onClick={() => cart.decrementSize(id)}
                icon={<Minus className={`w-4 h-4`} />}
                variant="ghost"
              />
              <p>{product.quantity}</p>
              <ActionButton
                onClick={incrementProductQuantity}
                icon={<Plus className="w-4 h-4" />}
                variant="ghost"
              />
            </div>
          </div>
          {priceFormater.format(price * quantity)}
        </div>
      </div>
    </li>
  );
};
