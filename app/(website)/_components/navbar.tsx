import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";

export const LandingPageNavbar = () => {
  return (
    <div className="relative flex w-full justify-between items-center">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <MenuIcon className="w-6 h-6" />
        <Image src="/opal-logo.svg" alt="Logo" width={40} height={40} />
        <span className="text-xl">Opal</span>
      </div>
      <div className="hidden gap-x-10 items-center lg:flex absolute left-1/2 -translate-x-1/2">
        <Link
          href="/"
          className="bg-[#7320DD] py-2 px-6 font-semibold rounded-full hover:bg-[#7320DD]/80 transition-all"
        >
          Home
        </Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <Link href="/auth/sign-in">
        <Button>
          <User fill="#000" /> Login
        </Button>
      </Link>
    </div>
  );
};
