import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/users";
import validator from "validator";

function UserEdit(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.value);
  // used ref to get input data
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const [emailExists, setEmailExists] = useState(false);
  const [emailNotValid, setEmailNotValid] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [nameEmpty, setNameEmpty] = useState(false);

  const userid = props.id;
  const user = allUsers.find((user) => user.id === parseInt(userid));

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      id: user.id,
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
    };
    // Name and email field validation
    let mailExists = allUsers.find((user) => user.email === data.email);

    if (mailExists && mailExists?.email === data.email) {
      mailExists = false;
    }

    if (data.name === "") {
      setNameEmpty(true);
    } else if (data.email === "") {
      setEmailEmpty(true);
    } else if (mailExists) {
      setEmailExists(true);
    } else if (validator.isEmail(data.email) === false) {
      setEmailNotValid(true);
    } else {
      // dispatched to global state here
      dispatch(updateUser(data));
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
          <div className="w-full lg:w-[80%] flex justify-end mr-8 lg:mr-24">
            <label htmlFor="name" className="mr-8 lg:mr-24">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.name}
              required
              className={` outline-1 outline ${
                nameEmpty ? "outline-red-600" : "outline-gray-300"
              } w-[60%] max-w-2xl shadow focus:outline-none focus:shadow-lg shadow-gray-100  py-3 px-4 rounded`}
              ref={nameInputRef}
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
          <div className="w-full lg:w-[80%] flex justify-end mr-8 lg:mr-24 mt-8">
            <label htmlFor="email" className=" mr-8 lg:mr-24">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              required
              className={` outline-1 outline ${
                emailEmpty || emailNotValid || emailExists
                  ? "outline-red-600"
                  : "outline-gray-300"
              } w-[60%] shadow focus:outline-none focus:shadow-lg shadow-gray-100 max-w-2xl py-3 px-4 rounded `}
              ref={emailInputRef}
              onFocus={() => {
                setEmailEmpty(false);
                setEmailExists(false);
                setEmailNotValid(false);
              }}
            />
          </div>
          {emailEmpty && (
            <div className=" text-red-600 text-xs font-thin text-centermr-8 lg:mr-24 mt-1">
              Email is required!
            </div>
          )}
          {emailNotValid && (
            <div className=" text-red-600 text-xs font-thin text-center mr-8 lg:mr-24 mt-1">
              Enter a valid email!
            </div>
          )}
          {emailExists && (
            <div className=" text-red-600 text-xs font-thin text-center mr-8 lg:mr-24 mt-1">
              Email already exists!
            </div>
          )}
          <div className=" w-[10%] flex space-x-8 justify-end mr-8 lg:mr-24 mt-8">
            <button
              className="outline outline-red-500 outline-1 text-red-500 px-8 py-2 rounded"
              onClick={() => {
                navigate("/");
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

export default UserEdit;
