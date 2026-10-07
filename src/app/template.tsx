import { PageTransition } from "@/components/motion/PageTransition";

/** Re-mounted on every navigation (unlike layout), so the transition replays. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
