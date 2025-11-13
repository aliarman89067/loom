import { redirect } from "next/navigation";
import { onAuthenticatedUser } from "@/actions/user";

type Props = {};

const AuthCallbackPage = async (props: Props) => {
  // Authenticate
  const auth = await onAuthenticatedUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.firstName}${auth.user?.lastName}`);
  }
  if (
    auth.status === 400 ||
    auth.status === 500 ||
    auth.status === 404 ||
    auth.status === 403
  ) {
    return redirect("/auth/sign-in");
  }
  return <div>AuthCallbackPage</div>;
};

export default AuthCallbackPage;
