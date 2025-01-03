const Footer = () => {
    return (
      <footer className="bg-black">
        <ul className="flex items-center justify-between lg:container px-4 py-6 mx-auto text-sm text-white md:px-6">
          <li>
            Created by: {" "}
            <a
              href="https://taylorbryant.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              Walter J. Gomero
            </a>
          </li>
  
          <li>
            <a
              href="https://github.com/oddstronaut/next-starter-tailwind"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              @2023
            </a>
          </li>
        </ul>
      </footer>
    );
  }
  export default Footer;