import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-24">
      <div aria-hidden className="blueprint absolute inset-0 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
      <div className="container-x relative text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-6 font-display text-[clamp(6rem,22vw,16rem)] leading-none text-laterite">404</h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-mute">This floor hasn&apos;t been built yet. The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/projects" variant="outline">View projects</Button>
        </div>
      </div>
    </section>
  );
}
