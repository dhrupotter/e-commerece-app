import React, { useEffect } from "react";
import { getWishlistProductsService } from "../../services/wishlist.service";
import { useAuth } from "../../contexts/auth.context";

const Wishlist = () => {
  const { user, setUser } = useAuth();
  const getWishlistProducts = async () => {
    try {
      const res = await getWishlistProductsService(user.token);
      console.log(res);
      setUser((prev) => ({
        ...prev,
        user: { ...prev.user, wishlist: res.data.wishlist },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlistProducts();
  }, []);

  return <div>Wishlist</div>;
};

export default Wishlist;
