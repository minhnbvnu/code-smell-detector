function HeroLayout() {
  // This is so that the react-scroll-motion library
  // works correctly within Next.js
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(typeof window !== undefined ? true : false);
  }, []);

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const Icon = ({ name, href, icon }) => (
    <Link href={href} passHref>
      <a className="flex flex-col justify-center items-center mx-2 my-2 space-y-2 w-24 h-24 text-lg text-indigo-400 rounded-full border border-indigo-300 hover:text-white hover:bg-indigo-900 md:mx-4 md:my-4 md:w-32 md:h-32">
        <p>{icon && <FontAwesomeIcon icon={icon} size="2x" />}</p>
        <p className="font-semibold">{name}</p>
      </a>
    </Link>
  );

  return (
    <>
      <Head />
      {isBrowser && (
        <ScrollContainer snap="none" inView={inView}>
          {!inView && <Header />}
          <ScrollPage page={0}>
            <div className="flex flex-col justify-evenly items-center h-screen text-white">
              <div className="hidden md:block md:py-16"></div>
              <Animator animation={MoveOut(-1000, 0)}>
                <div
                  className="group relative"
                  onDragStart={preventDragHandler}
                >
                  <div className="group-hover:bg-purple-600 group-hover:opacity-10 group-hover:blur-xl absolute inset-0 rounded rounded-full"></div>
                  <div className="relative">
                    <img
                      src={orbitsImage.src}
                      className="relative mx-auto w-[70%] animate-spin-slow motion-reduce:animate-none hover:"
                      alt="Concentric circles rotating together"
                    />
                    <img
                      src={textImage.src}
                      className="absolute top-[108px] p-4 bg-[#0E0A22]"
                      alt="Learn how to build and measure a thriving community with the Orbit Model"
                    />
                  </div>
                </div>
              </Animator>
              {/* This ref is needed so that the app knows when to display Header */}
              <div ref={ref} className="absolute top-36"></div>

              <div className="hidden mt-8 md:block">
                <div className="font-semibold text-center">
                  <div>Learn how to build and measure a thriving community</div>
                  <div>with the Orbit Model.</div>
                </div>
                <br></br>
                <div className="text-center">
                  <p>Scroll down to start guide</p>
                  <br></br>
                  <Image
                    src={arrowDown}
                    alt="Purple arrow pointing down"
                    className="animate-bounce motion-reduce:animate-none"
                  />
                </div>
              </div>
            </div>
          </ScrollPage>

          <ScrollPage page={1}>
            <div className="flex justify-center items-center h-screen text-white bg-[#1E1449]">
              <Slide1 />
            </div>
          </ScrollPage>
          <ScrollPage page={2}>
            <div className="flex justify-center items-center h-screen text-white bg-[#0F0A25]">
              <Slide2 />
            </div>
          </ScrollPage>
          <ScrollPage page={3}>
            <div className="flex justify-center items-center h-screen text-white bg-[#1E1449]">
              <Slide3 />
            </div>
          </ScrollPage>
          <ScrollPage page={4}>
            <div className="flex justify-center items-center h-screen text-white bg-[#0F0A25]">
              <Slide4 />
            </div>
          </ScrollPage>
          <ScrollPage page={5}>
            <div className="flex justify-center items-center h-screen text-white bg-[#1E1449]">
              <Slide5 />
            </div>
          </ScrollPage>
          <ScrollPage page={6}>
            <div className="flex justify-center items-center h-screen text-white bg-[#0F0A25]">
              <Slide6 />
            </div>
          </ScrollPage>
          <ScrollPage page={7}>
            <div className="flex justify-center items-center h-screen text-white bg-[#1E1449]">
              <Slide7 />
            </div>
          </ScrollPage>
          <div className="xs:block hidden">
            <ScrollPage page={8}>
              <div className="md:my-32"></div>
              <div className="xs:block hidden overflow-y-auto pb-12 my-24 text-center md:px-8">
                <h1 className="xs:text-3xl px-6 text-xl font-extrabold md:text-4xl">
                  Speak the cosmic language
                </h1>
                <p className="xs:text-lg px-6 my-4 mx-auto w-full md:my-6 md:my-12 md:w-2/3 md:text-xl">
                  The model is a family of concepts designed to work together,
                  giving your team a vocabulary and framework for visualizing
                  how your community works.
                </p>
                <div className="my-12 mx-auto w-3/4 text-lg md:w-3/4">
                  <div className="flex flex-wrap justify-center">
                    <Icon name="Gravity" href="/gravity"></Icon>
                    <Icon name="Love" href="/love"></Icon>
                    <Icon
                      name={
                        <span>
                          Orbit <br />
                          Levels
                        </span>
                      }
                      icon=""
                      href="/love/orbit-levels"
                    ></Icon>
                    <Icon name="Roles" href="/love/roles"></Icon>
                    <Icon name="Reach" href="/reach"></Icon>
                    <Icon name="Impact" href="/impact"></Icon>
                    <Icon name="...more" href="/introduction"></Icon>
                  </div>
                </div>
              </div>
            </ScrollPage>
          </div>
        </ScrollContainer>
      )}
    </>
  );
}