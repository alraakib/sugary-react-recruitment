import { errorToast, loadingToast, successToast } from "@/components/toast";
import { authAxios } from "@/libs/auth";
import type { RootState } from "@/store";
import { setTokens } from "@/store/slice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { z } from "zod";

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const formSchema = z.object({
    UserName: z
      .string({ message: "Username is required" })
      .nonempty("Username is required")
      .email({ message: "Please enter a valid email" }),
    Password: z
      .string({ message: "Password is required" })
      .nonempty("Password is required")
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

  const formSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ) => {
    const loginNotify = toast.custom(loadingToast("Logging in..."), {
      duration: 10000,
    });
    try {
      const { status, data: loginData } = await authAxios.post(
        `/AdminAccount/Login`,
        {
          UserName: data.UserName,
          Password: data.Password,
        }
      );
      if (status === 200) {
        toast.dismiss(loginNotify);
        toast.custom(successToast("Login successful"));

        dispatch(
          setTokens({
            AccessToken: loginData?.Token,
            RefreshToken: loginData?.RefreshToken,
            isAuthenticated: true,
            reavlidated: true,
          })
        );
      }
    } catch (error) {
      toast.dismiss(loginNotify);
      toast.custom(errorToast((error as Error).message));
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    shouldFocusError: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      UserName: "react@test.com",
      Password: "playful009",
    },
  });

  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return auth.reavlidated ? (
    <div className="flex items-center justify-center min-h-dvh">
      <form
        className="flex flex-col gap-4 max-w-lg w-full bg-black/50 border border-gray-500/50 px-5 py-7 rounded-xl"
        onSubmit={handleSubmit(formSubmit)}
      >
        <img
          src="./Sugary Logo.png"
          className="max-w-24 mx-auto"
          alt="Sugary LLC"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-amber-500 font-serif text-center">
            Welcome back!
          </h1>
          <p className="text-gray-500 text-center">Login to your account</p>
        </div>
        <label htmlFor="UserName" className="flex flex-col gap-2">
          Username or Email
          <input
            className="w-full rounded-md border-2 border-gray-700 bg-gray-800 p-2 text-white outline-0 focus:outline-1 focus:outline-amber-500 focus-visible:ring-4 ring-amber-500/30 transition-all duration-75 ease-in-out flex items-center"
            {...register("UserName")}
            type="text"
            placeholder="Username or Email"
          />
          {errors?.UserName && (
            <p className="text-sm text-red-500/95">
              {errors?.UserName?.message}
            </p>
          )}
        </label>
        <label htmlFor="Password" className="flex flex-col gap-2">
          Password
          <input
            className="w-full rounded-md border-2 border-gray-700 bg-gray-800 p-2 text-white outline-0 focus:outline-1 focus:outline-amber-500 focus-visible:ring-4 ring-amber-500/30 transition-all duration-75 ease-in-out flex items-center"
            {...register("Password")}
            type="password"
            placeholder="Password"
          />
          {errors?.Password && (
            <p className="text-sm text-red-500/95">
              {errors?.Password?.message}
            </p>
          )}
        </label>
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-amber-500 text-white font-bold shadow hover:bg-amber-500/90 h-9 px-4 py-2 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center gap-3 min-h-dvh">
      <div className="flex flex-col gap-3">
        <img
          src="./Sugary Logo.png"
          className="max-w-24 mx-auto"
          alt="Sugary LLC"
        />
        <h1 className="text-2xl font-extrabold text-amber-500 text-center font-serif">
          Sugary LLC
        </h1>
        <p className="text-center">Restoring session...</p>
        <LoaderCircle className="animate-spin mx-auto" />
      </div>
    </div>
  );
}
