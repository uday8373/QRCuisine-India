"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import ThemeToggle from "../themes/theme-switch";
import { Logo, LogoShort } from "../icons/icons";
import { Button, useDisclosure } from "@nextui-org/react";
import { ScanLine } from "lucide-react";
import QRCodeScanner from "../modal/QR-Scanner";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathName = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (pathName !== "/" && pathName !== "/register-business") {
    return null;
  }
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent> */}
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

      <NavbarContent className="basis-1" justify="end">
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
      </NavbarContent>

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
      <QRCodeScanner isOpen={isOpen} onOpenChange={onOpenChange} />
    </NextUINavbar>
  );
};
