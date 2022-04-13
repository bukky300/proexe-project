import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../features/users";

function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.value);
  const [users, setUsers] = useState(allUsers);
  const [userId, setUserId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  function handleSortAsc(e) {
    e.preventDefault();
    const arr = [];
    allUsers.map((user) => arr.push(user.username));
    const aToZ = arr.sort();
    const newArr = [];

    aToZ.map((username) => {
      let a = allUsers.find((user) => user.username === username);
      newArr.push(a);
      return a;
    });
    setUsers(newArr);
  }

  function handleSortDesc(e) {
    e.preventDefault();
    const arr = [];

    allUsers.map((user) => arr.push(user.username));
    const aToZ = arr.sort();
    const zToA = aToZ.reverse();

    const newArr = [];

    zToA.map((username) => {
      let a = allUsers.find((user) => user.username === username);
      newArr.push(a);
      return newArr;
    });
    setUsers(newArr);
  }

  function handleDelete(e) {
    e.preventDefault();
    dispatch(deleteUser(userId));
    setModalOpen(false);
  }

  return (
    <>
      {modalOpen && (
        <div className=" w-screen h-screen fixed top-0 left-0 bg-[#c8c8c8d9] flex justify-center items-center ">
          <div className=" w-96 h-60 bg-white shadow rounded flex flex-col">
            <div className="ml-4 mt-4">
              <h1 className=" font-semibold text-base ">Delete</h1>
            </div>
            <div className=" border-[1px] border-solid border-gray-300 mt-4"></div>
            <div className="text-center my-8">
              <p className=" font-medium">Are you Sure? </p>
            </div>
            <div className=" border-[1px] border-solid border-gray-300 "></div>
            <div className=" flex justify-end space-x-4 mt-6 mr-2">
              <button
                className=" py-2 px-4 bg-slate-600 text-white rounded"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="py-2 px-8 bg-red-600 text-white rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center my-12 ">
        <div className=" md:w-[96%] shadow-2xl rounded-xl">
          <div className="flex justify-between mt-4 ">
            <div className=" font-semibold ml-4">
              <h3>User list</h3>
            </div>
            <div className="mr-4 ">
              <button
                className="px-8 bg-blue-500 py-2 text-white shadow-md rounded-md"
                onClick={() => {
                  navigate("/adduser");
                }}
              >
                Add New
              </button>
            </div>
          </div>
          <div className="flex justify-center mb-4  overflow-x-auto ">
            <table className=" w-[98%] border-2 border-solid mt-4 min-w-[860px]">
              <thead className="bg-slate-50 w-full">
                <tr className=" text-center h-28 border-b-2 border-solid">
                  <td className=" w-[14.285714%]">Id</td>
                  <td className=" w-[14.285714%]">Name</td>
                  <td className=" w-[14.285714%] align-middle flex flex-col mt-10 mx-auto justify-center">
                    <span>Username</span>
                    <span className="flex space-x-2 mt-1">
                      <button
                        className=" bg-green-400 px-2 rounded"
                        onClick={handleSortAsc}
                      >
                        asc
                      </button>
                      <button
                        className="bg-green-400 px-2 rounded"
                        onClick={handleSortDesc}
                      >
                        desc
                      </button>
                    </span>
                  </td>
                  <td className=" w-[14.285714%]">Email</td>
                  <td className=" w-[14.285714%]">City</td>
                  <td className=" w-[14.285714%]">Edit</td>
                  <td className=" w-[14.285714%]">Delete</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    className="text-center md:text-sm h-28 border-b-[1px] border-solid"
                    key={user.id}
                  >
                    <td className=" w-[14.285714%]">{user?.id}</td>
                    <td className=" w-[14.285714%]">{user?.name}</td>
                    <td className=" w-[14.285714%]">{user?.username}</td>
                    <td className=" w-[14.285714%]">{user?.email}</td>
                    <td className=" w-[14.285714%]">{user?.address?.city}</td>
                    <td className=" w-[14.285714%]">
                      <button
                        className=" bg-amber-500 text-white px-8 md:px-6 py-1 rounded"
                        onClick={() => {
                          navigate(`/edituser/${user.id}`);
                        }}
                      >
                        edit
                      </button>
                    </td>
                    <td className=" w-[14.285714%]">
                      <button
                        className=" bg-red-600 md:mr-1 text-white px-8 md:px-6 py-1 rounded"
                        onClick={() => {
                          setModalOpen(true);
                          setUserId(user.id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
