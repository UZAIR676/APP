import React from 'react';

const About = () => {
  return (
    <div className="p-8  min-h-screen">
      <div className="max-w-4xl mx-auto  p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">About Us</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Our Mission</h2>
          <p className="text-white">
            We aim to provide the best food services to our customers by offering a wide variety of
            delicious meals, carefully crafted with the finest ingredients. Our mission is to deliver
            quality, consistency, and a delightful dining experience to all our patrons.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Who We Are</h2>
          <p className="">
            We are a team of passionate food enthusiasts, chefs, and culinary professionals who share
            a common goal: to serve great food with a touch of creativity and care. Our team works
            tirelessly to bring you an extraordinary menu that caters to all tastes and preferences.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Our Story</h2>
          <p className="">
            It all started with a dream to make great food more accessible to everyone. We began as a
            small kitchen, and through hard work and dedication, we’ve grown into a full-fledged
            restaurant known for our innovation, attention to detail, and exceptional customer service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">What We Offer</h2>
          <p className="">
            Our menu features a wide array of dishes, from appetizers to desserts, with options for
            vegetarians, vegans, and meat lovers alike. Whether you're craving something savory or
            sweet, you'll find something to love in our menu.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">Why Choose Us?</h2>
          <ul className="list-disc ml-6 ">
            <li>High-quality ingredients sourced locally and sustainably.</li>
            <li>Experienced chefs who put passion into every dish.</li>
            <li>A commitment to providing a memorable dining experience.</li>
            <li>Fast and reliable delivery services for your convenience.</li>
            <li>Dedicated customer support ready to assist you anytime.</li>
          </ul>
        </section>

        <section className="mt-10 text-center">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Join Us on Our Journey</h3>
          <p className="text-gray-600">
            We invite you to explore our menu, visit our restaurant, and experience the magic we
            bring to the table. Whether you're dining with us or ordering to-go, we promise to
            make your experience one to remember.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
