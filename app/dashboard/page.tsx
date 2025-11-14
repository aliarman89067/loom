import { redirect } from "next/navigation";
import { onAuthenticatedUser } from "@/actions/user";

type Props = {};

const DashboardPage = async (props: Props) => {
  // Authenticate
  const auth = await onAuthenticatedUser();
  console.log(auth);
  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (
    auth.status === 400 ||
    auth.status === 500 ||
    auth.status === 404 ||
    auth.status === 403
  ) {
    return redirect("/auth/sign-in");
  }
  return <div>DashboardPage</div>;
};

export default DashboardPage;
