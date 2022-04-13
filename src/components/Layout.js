import React from "react";

function Layout(props) {
  return (
    <>
      <div className="w-screen">
        <div className="flex justify-center">
          <div className="w-[96%]">
            <h1 className="  text-3xl font-bold mt-12">Dashboard</h1>
          </div>
        </div>
        <>{props.children}</>
      </div>
    </>
  );
}

export default Layout;
