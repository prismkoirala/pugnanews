import Image from "next/image"; // Ensure this import is present

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        {/* Top Section: News Site Branding and Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo/Branding Section */}
          <div className="flex items-center gap-2">
            {/* <Image
              src="/logo.png" // Replace with your site logo (e.g., xyznews logo in public/logo.png)
              alt="xyznews Logo"
              width={40}
              height={40}
              className="rounded-full"
            /> */}
            <span className="text-xl font-bold text-white">pugnanews</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Links</h3>
            <span
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Home
            </span>
            <a
              href="/category/general"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Categories
            </a>
            <a
              href="/about"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              About Us
            </a>
          </div>

          {/* External Resources (Your Original Links, Styled) */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">About</h3>
            <a
              className="flex items-center gap-2 text-gray-400 hover:text-white hover:underline hover:underline-offset-4 transition-colors duration-200"
              href="https://nextjs.org/learn?utm_source=xyznews&utm_medium=footer&utm_campaign=xyznews"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Learn more about Next.js"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              X
            </a>
            <a
              className="flex items-center gap-2 text-gray-400 hover:text-white hover:underline hover:underline-offset-4 transition-colors duration-200"
              href="https://vercel.com/templates?framework=next.js&utm_source=xyznews&utm_medium=footer&utm_campaign=xyznews"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Explore Next.js examples"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Facebook
            </a>
           
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} RadiantRead. All rights reserved. |{" "}
            <a
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>{" "}
            |{" "}
            <a
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}