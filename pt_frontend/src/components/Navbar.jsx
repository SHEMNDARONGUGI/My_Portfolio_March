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
      <div className="p-6 flex justify-between bg-blue-900">
        <h1 className="text-white font-semibold tracking-wide text-lg">
          Shem Ndaro Ngugi
        </h1>
        <NavigationMenu className="text-white hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-yellow-500 hover:text-blue-900"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-yellow-500 hover:text-blue-900"
              >
                Experience
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-yellow-500 hover:text-blue-900"
              >
                Education
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-yellow-500 hover:text-blue-900"
              >
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className="hover:bg-yellow-500 hover:text-blue-900"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:bg-yellow-500 hover:text-blue-900">
                Account
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Login</NavigationMenuLink>
                <NavigationMenuLink href="#">Register</NavigationMenuLink>
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
