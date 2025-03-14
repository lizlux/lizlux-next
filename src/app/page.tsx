import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Image
        aria-hidden
        src="/Vine.svg"
        alt="decorative vine"
        width={900}
        height={1211}
        className={styles.vine}
      />

      <header className={styles.header}>
        <span className={styles.headshot}>
          <Image
            aria-hidden
            src="/Liz_Lee_Headshot.jpg"
            alt="Liz Lee headshot"
            width={160}
            height={240}
          />
        </span>
        <h1 className={styles.heading1}>Liz Lee</h1>
        <div className={styles.details}>
          <p>Lead Front End Engineer</p>
          <p>Engineering Mangement</p>
          <p>JavaScript / Typescript</p>
          <p>HTML / CSS</p>
          <p>React / Redux</p>
          <p>Angular / NgRx</p>
          <p>UI Design Systems</p>
          <p>Expert Level</p>
        </div>
      </header>
      <section className={styles.content}>
        <h2 className={styles.heading2}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's Build
          <br />
          Great Products
        </h2>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link
                href="https://www.linkedin.com/in/lizluxlee/"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/lizlux"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="/Liz_Lee_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                Resume
              </Link>
            </li>
            <li>
              <Link href="/sudoku" className={styles.link}>
                Play Sudoku
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>

    // <div className={styles.page}>
    //   <main className={styles.main}>
    //     <Image
    //       className={styles.logo}
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol>
    //       <li>
    //         Get started by editing <code>src/app/page.tsx</code>.
    //       </li>
    //       <li>Save and see your changes instantly.</li>
    //     </ol>

    //     <div className={styles.ctas}>
    //       <a
    //         className={styles.primary}
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className={styles.logo}
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className={styles.secondary}
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className={styles.footer}>
    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
