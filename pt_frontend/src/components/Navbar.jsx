import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "./ui/navigation-menu";

import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header fixed top-0 w-full z-50>
      <div className="p-6 flex justify-between bg-black/80">
        <h1 className="text-white font-semibold tracking-wide text-3xl">
          Shem Ndaro Ngugi
        </h1>
        <NavigationMenu className="text-white hidden md:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-transparent hover:text-yellow-500"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-transparent hover:text-yellow-500"
              >
                Experience
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-transparent hover:text-yellow-500"
              >
                Education
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-transparent hover:text-yellow-500"
              >
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-transparent hover:text-yellow-500"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="bg-transparent">
              <NavigationMenuTrigger className=" hover:text-black hover:bg-transparent">
                Account
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink
                  href="#"
                  className="hover:bg-transparent hover:text-yellow-500"
                >
                  Login
                </NavigationMenuLink>
                <NavigationMenuLink
                  href="#"
                  className="hover:bg-transparent hover:text-yellow-500"
                >
                  Register
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <button className="md:hidden text-white">
          <Menu />
        </button>
      </div>
    </header>
  );
}
