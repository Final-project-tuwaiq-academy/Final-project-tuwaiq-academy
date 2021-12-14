export const addUsers = (user) => {
    return {
      type: "ADD_USERS",
      payload: user,
    };
  };

  export const removeUsers = () => {
    return {
      type: "REMOVE_USERS"
    };
  };


  