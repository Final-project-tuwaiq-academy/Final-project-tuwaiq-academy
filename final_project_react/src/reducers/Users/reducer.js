const initialState= {
    user:{}
}

const userReducer= (state=initialState , {type,payload})=>{

    switch (type) {
        case "ADD_USERS":
            return{
                user:payload
            }
        case "REMOVE_USERS":
            return{
                user:{}
            }
        default:
            return state;
    }
    
}


export default userReducer;