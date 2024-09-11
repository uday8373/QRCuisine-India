"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import ThemeToggle from "../themes/theme-switch";
import { Logo, LogoShort } from "../icons/icons";
import { Button, useDisclosure } from "@nextui-org/react";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { Link as ScrollLink } from "react-scroll";

export const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  if (
    pathName !== "/" &&
    pathName !== "/register-business" &&
    pathName !== "/home" &&
    pathName !== "/book-free-demo"
  ) {
    return null;
  }
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent> */}

      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden  "
      />
      <NavbarBrand as="li" className="max-w-fit" justify="start">
        <NextLink className="flex justify-start items-center" href="/">
          <Logo className="md:flex hidden" />
          <LogoShort className="md:hidden flex" />
        </NextLink>
      </NavbarBrand>
      {/* <NavbarContent className="basis-full" justify="center">
        <ul className="hidden md:flex gap-5 justify-start">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent> */}
      <NavbarContent className="hidden sm:flex gap-10  w-full" justify="center">
        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={index}>
            <ScrollLink
              className="cursor-pointer"
              to={item.href}
              smooth={true}
              duration={500}
              offset={-40}
            >
              {item.label}
            </ScrollLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* <NavbarContent className="basis-1" justify="end">
        <ThemeToggle />
        <NavbarItem>
          <Button
            onClick={onOpen}
            color="primary"
            href="#"
            variant="flat"
            className="font-medium"
            startContent={<ScanLine size={18} />}
          >
            Scan Now
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      {/* <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-3">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 4
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 0
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu> */}

      <NavbarContent className="basis-1 hidden sm:flex" justify="end">
        <NavbarItem>
          <Button
            //   onClick={onOpen}
            color="secondary"
            href="#"
            variant="solid"
            className="font-medium w-40"
          >
            Free Demo
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            color="primary"
            href="#"
            variant="solid"
            className="font-medium w-40"
          >
            Register
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="z-50">
        {siteConfig.navMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <ScrollLink
              className="cursor-pointer"
              to={item.href}
              smooth={true}
              duration={500}
              offset={-40}
            >
              {item.label}
            </ScrollLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};
