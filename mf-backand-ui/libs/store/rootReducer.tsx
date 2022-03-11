import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "apps/home/src/app/pages/login/UserSlice";
import UsersDataSlice from "apps/users/src/app/UsersDataSlice";
import UsersRolesSlice from "apps/users/src/app/pages/roles/UsersRolesSlice";
import UsersPermissionsSlice from "apps/users/src/app/pages/permissions/UsersPermissionsSlice";

const rootReducer = combineReducers({ 
    authReducer,
    UsersDataSlice,
    UsersRolesSlice,
    UsersPermissionsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;