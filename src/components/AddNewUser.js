import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/users";
import validator from "validator";

function AddNewUser() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);
  const allUsers = useSelector((state) => state.users.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Name and email field validation
    const mailExists = allUsers.find((user) => user.email === newUser.email);
    console.log(mailExists);

    if (newUser.name === "") {
      setNameEmpty(true);
    } else if (newUser.email === "") {
      setEmailEmpty(true);
    } else if (mailExists) {
      setEmailExists(true);
    } else if (validator.isEmail(newUser.email) === false) {
      setEmailNotValid(true);
    } else {
      // dispatched data after all validations here
      dispatch(addUser(newUser));
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center mt-12">
      <div className=" w-[96%] md:w-full shadow-2xl rounded-xl h-96">
        <div className="flex justify-between mt-4 mx-4">
          <div className=" font-semibold">
            <h3>Form</h3>
          </div>
        </div>
        <div className=" border-[1px] border-solid border-gray-300 mt-4"></div>
        <div className="flex items-end flex-col mt-16">
          <div className=" w-full lg:w-[80%] flex justify-end mr-8 lg:mr-24">
            <label htmlFor="name" className=" mr-8 lg:mr-24 ">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className={` outline-1 outline ${
                nameEmpty ? "outline-red-600" : "outline-gray-300"
              } w-[60%] max-w-2xl shadow focus:outline-none focus:shadow-lg shadow-gray-100 py-3 px-4 rounded`}
              onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
              }}
              onFocus={(e) => {
                setNameEmpty(false);
              }}
            />
          </div>
          {nameEmpty && (
            <div className=" text-red-600 text-xs font-thin text-center mr-24 mt-1">
              Enter Name!
            </div>
          )}
          <div className=" w-full lg:w-[80%] flex justify-end mr-8 lg:mr-24 mt-8">
            <label htmlFor="email" className=" mr-8 lg:mr-24">
              Email:
            </label>
            <input
              type="email"
              name="email"
              required
              className={` outline-1 outline ${
                emailEmpty || emailNotValid || emailExists
                  ? "outline-red-600"
                  : "outline-gray-300"
              } w-[60%] shadow focus:outline-none focus:shadow-lg shadow-gray-100 max-w-2xl py-3 px-4 rounded `}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
              }}
              onFocus={(e) => {
                setEmailEmpty(false);
                setEmailExists(false);
                setEmailNotValid(false);
              }}
            />
          </div>
          {emailNotValid && (
            <div className=" text-red-600 text-xs font-thin text-center mr-8 lg:mr-24 mt-1">
              Enter a Valid email!
            </div>
          )}
          {emailExists && (
            <div className=" text-red-600 text-xs font-thin text-center mr-8 lg:mr-24 mt-1">
              Email already exists!
            </div>
          )}
          {emailEmpty && (
            <div className=" text-red-600 text-xs font-thin text-center mr-8 lg:mr-24 mt-1">
              Email is required!
            </div>
          )}
          <div className=" w-[10%] flex space-x-8 justify-end mr-8 lg:mr-24 mt-8">
            <button
              className="outline outline-red-500 outline-1 text-red-500 px-8 py-2 rounded"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" bg-green-600 px-8 py-2 text-white rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewUser;
