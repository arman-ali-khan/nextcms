import { UserContext } from "@/Context/AuthContext";
import Link from "next/link";
import { useContext } from "react";

const CategoryCard = ({category}) => {
  const {user,siteId} = useContext(UserContext)
    return (
        
        <li className="p-1 border-b">
        <div className="flex items-center gap-2">
        ›
          <div className="leading-5 text-sm">
            <Link
              className="text-info hover:underline "
              href={`/${siteId?.siteurl}/category/${category.value}`}
            >
             {category.label}
            </Link>{' '}(10)
          </div>
        </div>
      </li>
    );
};

export default CategoryCard;