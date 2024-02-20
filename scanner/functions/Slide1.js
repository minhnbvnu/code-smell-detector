function Slide1(props) {
  const altText = "Heart within atom illustration";

  return (
    <Slide image={slideOneImage} altText={altText} {...props}>
      <div className="xs:block flex hidden justify-center items-center px-12 mt-8 mx-auto w-96 text-center md:hidden md:p-12 md:mt-0">
        <Image src={slideOneImage} alt={altText} />
      </div>
      <div className="xs:text-3xl px-10 w-full text-xl font-extrabold md:px-0 md:w-4/5 md:text-5xl">
        Grow the community,
        <br /> keep the soul.
      </div>
      <div className="xs:text-lg px-10 w-full tracking-wide leading-relaxed md:px-0 md:w-4/5 md:text-xl">
        Legendary communities have one thing in common: they keep members happy
        and fulfilled, even at scale. Take a tour of the Orbit Model to see how
        it&apos;s possible.
      </div>
    </Slide>
  );
}