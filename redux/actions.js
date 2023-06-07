import { USER_INFO_UPDATE } from "./type"

export const userUpdate = (userInfo) =>{
    return {
      type:USER_INFO_UPDATE,
      userInfo: userInfo
    }
  }