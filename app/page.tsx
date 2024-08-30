import Formatter from "@/components/Formatter";
import LanguageSelect from "@/components/LanguageSelect";
import Title from "@/components/Title";

export default function Home() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between md:px-24 md:py-24 px-8 py-24">
          <LanguageSelect/>
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
              <Title/>
              <div
                className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
                  <a
                    className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                    href="https://github.com/M1chalS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      By{" "}
                      M1chalS
                  </a>
              </div>
          </div>
          <Formatter/>
      </main>
    );
}
