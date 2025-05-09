import { successToast } from "@/components/toast";
import { authAxios } from "@/libs/auth";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import toast from "react-hot-toast";

export interface AuthState {
  AccessToken: string | null;
  RefreshToken: string | null;
  isAuthenticated: boolean;
  reavlidated: boolean;
}

const initialState: AuthState = {
  AccessToken: null,
  RefreshToken: null,
  isAuthenticated: false,
  reavlidated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state: AuthState, action: PayloadAction<AuthState>) => {
      if (action.payload.AccessToken && action.payload.RefreshToken) {
        state.AccessToken = action.payload.AccessToken;
        state.RefreshToken = action.payload.RefreshToken;
        state.isAuthenticated = true;
        state.reavlidated = true;
        localStorage.setItem("AccessToken", action.payload.AccessToken);
        localStorage.setItem("RefreshToken", action.payload.RefreshToken);
      }
    },
    removeTokens: (state: AuthState) => {
      state.AccessToken = null;
      state.RefreshToken = null;
      state.isAuthenticated = false;
      state.reavlidated = true;
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(revalidateTokens.fulfilled, (state, action) => {
        state.AccessToken = action.payload.AccessToken;
        state.RefreshToken = action.payload.RefreshToken;
        state.isAuthenticated = true;
        state.reavlidated = true;
        localStorage.setItem("AccessToken", action.payload.AccessToken);
        localStorage.setItem("RefreshToken", action.payload.RefreshToken);
        toast.custom(successToast("Session restored successfully"));
      })
      .addCase(revalidateTokens.rejected, (state) => {
        state.AccessToken = null;
        state.RefreshToken = null;
        state.isAuthenticated = false;
        state.reavlidated = true;
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
      });
  },
});

export const revalidateTokens = createAsyncThunk(
  "auth/revalidateTokens",
  async (
    params: { AccessToken: string; RefreshToken: string },
    { dispatch }
  ) => {
    try {
      const { AccessToken, RefreshToken } = params;

      const { status, data } = await authAxios.post("/Account/RefreshToken", {
        AccessToken: AccessToken,
        RefreshToken: RefreshToken,
      });

      if (status !== 200) {
        throw new Error("Token refresh failed");
      }

      const { Token, RefreshToken: rToken } = data;

      return {
        AccessToken: Token,
        RefreshToken: rToken,
      };
    } catch (error) {
      dispatch(removeTokens());
      throw error;
    }
  }
);

export const { setTokens, removeTokens } = authSlice.actions;

export default authSlice.reducer;
