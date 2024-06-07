import { Link } from "@tanstack/react-router";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="space-y-3 text-center">
        <h3 className="text-3xl font-bold">404! not found</h3>
        <Link to="/" className="capitalize italic text-blue-600 underline">
          go to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
