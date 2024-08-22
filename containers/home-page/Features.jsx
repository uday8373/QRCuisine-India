
"use client"
import React from 'react';
import { Card, CardBody, Grid, Image, CardFooter, Text, Button, Spacer } from "@nextui-org/react";


const features = [
  {
    title: "Smooth ordering process",
    description: "Pretium lectus quam id leo in vitae turpis. Mattis pellentesque id nibh tortor id.",
    image: "/path/to/image1.svg",
  },
  {
    title: "Less human needed",
    description: "Nunc consequat interdum varius sit amet mattis vulputate enim nulla. Risus feugiat.",
    image: "/path/to/image2.svg",
  },
  {
    title: "Real time analytics",
    description: "Nisi purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque mauris.",
    image: "/path/to/image3.svg",
  },
];

export default function Features() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1>
          Features
        </h1>
        <h3>
          Our Features & Services.
        </h3>
        <Spacer y={2} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} hoverable>
              <Image
                src={feature.image}
                objectFit="cover"
                width="100%"
                height={140}
                alt={feature.title}
              />
              <CardBody>
                <h4>{feature.title}</h4>
                <h5>{feature.description}</h5>
              </CardBody>
              <CardFooter>
                <Button shadow color="warning" auto>
                  More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}