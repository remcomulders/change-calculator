import { TransactionOverview } from "./_components/transaction-overview";
import {
    GitHubLogoIcon,
    GlobeIcon,
    LinkedInLogoIcon,
} from "@radix-ui/react-icons";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex gap-8 row-start-2 items-center sm:items-start relative z-10">
                <TransactionOverview />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center relative z-10">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.linkedin.com/in/remco-mulders/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedInLogoIcon aria-hidden width={16} height={16} />
                    LinkedIn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GitHubLogoIcon aria-hidden width={16} height={16} />
                    GitHub
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://mulders.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GlobeIcon aria-hidden width={16} height={16} />
                    Mulders Tech
                </a>
            </footer>
        </div>
    );
}
