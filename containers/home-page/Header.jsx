"use client";
import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";

import { Button, useDisclosure } from "@nextui-org/react";
import { Logo, LogoShort } from "@/components/icons/icons";
import { Link as ScrollLink } from "react-scroll";
const NavLinks = [
  {
    id: "Pricing",
    title: "Services",
  },
  {
    id: "Pricing",
    title: "About",
  },
  {
    id: "Pricing",
    title: "Knowledge",
  },
];

export default function Header() {
  return (
    <>
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarBrand as="li" className="max-w-fit " justify="start">
          <NextLink className="flex justify-start items-center" href="/">
            <Logo className="md:flex hidden" />
            <LogoShort className="md:hidden flex" />
          </NextLink>
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-10 w-full"
          justify="center"
        >
          {NavLinks.map((nav, index) => (
            <NavbarItem key={index}>
              <ScrollLink
                className="cursor-pointer"
                to={nav.id}
                smooth={true}
                duration={500}
                offset={-40}
              >
                {nav.title}
              </ScrollLink>
            </NavbarItem>
          ))}
        </NavbarContent>

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
      </NextUINavbar>
    </>
  );
}
