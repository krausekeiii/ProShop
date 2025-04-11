import Link from "next/link"
import { Button } from "@/components/ui/button"
import SearchForm from "@/components/search-form"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div
        className="relative flex min-h-screen flex-col bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/placeholder.svg?height=1080&width=1920')",
          backgroundPosition: "center",
        }}
      >
        <header className="z-10">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-white">
              <span className="text-xl">⛳</span>
              <span>Golf Assistant</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/favorites" className="text-sm font-medium text-white/80 hover:text-white">
                Favorites
              </Link>
              <Link href="/history" className="text-sm font-medium text-white/80 hover:text-white">
                History
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-green-800"
              >
                Sign In
              </Button>
            </nav>
          </div>
        </header>

        <main className="container flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Find the Perfect Tee Time
            </h1>
            <p className="mb-8 text-lg text-white/80 md:text-xl">
              Tell us when you want to play, we'll tell you where, when, and why.
            </p>

            <div className="w-full max-w-2xl rounded-xl bg-white/95 p-6 backdrop-blur-sm">
              <SearchForm />
            </div>
          </div>
        </main>

        <footer className="container z-10 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-white/70 md:flex-row">
            <p className="text-sm">© 2025 Golf Assistant. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
