import { Link } from "react-router";
import type { Belonging } from "../types/types";

type BelongingProp = {
  belonging: Belonging;
};

const BelongingCard = ({ belonging }: BelongingProp) => {
  return (
    <>
      <article className="w-full bg-slate-800  space-y-2 text-white ">
        <Link to={`/belongings/${belonging.id}`}>
          <img
            src={belonging.imageUrl}
            alt={belonging.name}
            className="object-cover h-48 w-full transition-transform duration-300 ease-initial hover:scale-[1.01]"
          />
        </Link>
        <div className="flex flex-col gap-2 p-2">
          <p className="mt-2 text-green-600 text-sm">
            {belonging.warrantyExpiry}
          </p>
          <h3 className="text-xl font-medium">{belonging.name}</h3>
          <h3 className="text-sm font-medium text-slate-400">
            {belonging.category}
          </h3>
          <p>${belonging.purchasePrice}</p>
          <p className="text-sm font-medium text-slate-400">
            Purchased: {belonging.purchaseDate}
          </p>
          <Link
            to={`/belongings/${belonging.id}`}
            className=" border border-slate-400 hover:bg-blue-600 hover:text-white py-2 w-full text-blue-400 text-center font-medium"
          >
            View Details
          </Link>
        </div>
      </article>
    </>
  );
};

export default BelongingCard;
