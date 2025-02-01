import Link from "next/link";
import Image from "next/image";
import { BadgePlus, LogOut } from "lucide-react";
import { cookies } from "next/headers";

const Navbar = async () => {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${process.env.DOMAIN}/api/users/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const User = await res.json();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 text-black">
          {User ? (
            <>
              {/*User details*/}
              <span className="text-xl font-work-sans capitalize font-bold">
                {User?.user.username}
              </span>
              {/* Create Startup Link */}
              <Link href="/startup/create">
                <span className="max-sm:hidden px-3 py-2 rounded-full font-semibold bg-primary-100">
                  Create
                </span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              {/* Logout Button */}
              <form>
                <button type="submit" className="flex items-center gap-2">
                  <span className="max-sm:hidden px-3 py-1 border-2 border-black rounded-full font-medium bg-secondary">
                    Logout
                  </span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>

              {/* User Avatar */}
              <Link href={`/user`}></Link>
            </>
          ) : (
            // Login Button
            <form>
              <Link
                href={"/login"}
                className="bg-primary text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
