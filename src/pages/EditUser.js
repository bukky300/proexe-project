import React from "react";
import { useParams } from "react-router-dom";
import UserEdit from "../components/UserEdit";

function EditUser() {
  const params = useParams();
  return <UserEdit id={params.userId} />;
}

export default EditUser;
