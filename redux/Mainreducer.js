import { USER_INFO_UPDATE } from "./type";

const initialState = {
    current_user_info:{
      userRef:'',
      userProfilePic:'',
      userName:'',
      userEmail:''
    }
};



export default (state = initialState, action) => {

    switch (action.type) {

        case USER_INFO_UPDATE:{
            return{
                ...state,
                current_user_info:action.userInfo
            }
        }



        default:
        return state;
    }


}