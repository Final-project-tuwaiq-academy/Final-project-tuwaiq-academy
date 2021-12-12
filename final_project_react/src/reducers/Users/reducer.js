const initialState= {
    users:{users:[
        {
        id:0,
        name: "Admin",
        password: "1122",
        }
    ],
    }
}

const userReducer= (state=initialState , {type,payload})=>{

    switch (type) {
        case "SET_USERS":

              let user = {
                   id:state.users.users[state.users.users.length-1].id+1,
                   name:payload.userName,
                   password: payload.password,
               }

            return { users:{ users:[...state.users.users, user]}}

        default:
            return state;
    }
    
}


export default userReducer;