import React from "react";
import Button from "./components/Button";

const NoAccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">403</h1>
            <p className="mt-4 text-xl text-gray-600">Access Denied</p>
            <Button
                href="/"
                className="mt-6 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                name={"Go Back Home"}
            ></Button>
        </div>
    );
};

export default NoAccess;
