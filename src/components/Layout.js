import React from "react";

function Layout(props) {
  return (
    <>
      <div className="w-screen">
        <div className="flex justify-start ml-4">
          <h1 className="  text-3xl font-bold mt-12">Dashboard</h1>
        </div>
        <>{props.children}</>
      </div>
    </>
  );
}

export default Layout;
