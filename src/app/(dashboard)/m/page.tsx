import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function page() {
  const session = await auth();

  if (session) {
    const onBoarded = await api.user.isOnboarded.query();
    if (!onBoarded) {
      redirect("/onboarding");
    } else {
      const org = await api.user.getUserOrganization.query();
      redirect(`/m/${org?.organizationId}`);
    }
  }
}
