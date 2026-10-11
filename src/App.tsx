import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BrandMark from './components/BrandMark'
import Quote from './components/Quote'
import { textLinkClassName } from './styles'

import { Analytics } from "@vercel/analytics/react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="page-shell relative isolate flex min-h-dvh flex-col overflow-x-hidden bg-[#eee8dc] bg-[url('./assets/mainBackground.jpg')] bg-left bg-cover bg-scroll px-[clamp(22px,6vw,88px)] pt-[max(22px,env(safe-area-inset-top))] pb-[max(22px,env(safe-area-inset-bottom))] text-[#382e25] max-[600px]:px-5 max-[600px]:pt-[max(12px,env(safe-area-inset-top))] max-[600px]:pb-[calc(env(safe-area-inset-bottom)+6rem)] max-[600px]:bg-no-repeat max-[600px]:bg-[length:auto_100dvh]">
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-[#f7f3ea]/70 via-[#f6f1e7]/48 to-[#eee7da]/55 max-[600px]:from-[#f7f3ea]/70 max-[600px]:via-[#f6f1e7]/57 max-[600px]:to-[#eee7da]/56" aria-hidden="true" />
        <header className="relative z-10 mx-auto flex min-h-8 w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <a className="group inline-flex items-center gap-3 text-[15px] tracking-[.035em] text-[#382e25] no-underline focus-visible:outline-[3px] focus-visible:outline-[#8a6145] focus-visible:outline-offset-[5px]" href="/" aria-label="Stoic Quote home">
            <BrandMark variant="logo" />
            <span>Stoic <span className="text-[#827563]">Quote</span></span>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-2 text-xs text-[#786c5c] max-[600px]:ml-auto max-[600px]:text-[11px]" role="group" aria-label="Creator and project links">
            <span>Created by</span>
            <a className={textLinkClassName} href="https://linkedin.com/in/mikhail-babaiants-frontend-dev" target="_blank" rel="noreferrer">Mikhail Babaiants</a>
            <span className="text-[#a18a68]" aria-hidden="true">×</span>
            <a className={textLinkClassName} href="https://openai.com/codex/" target="_blank" rel="noreferrer">Codex</a>
            <span className="px-1 text-[#a18a68]" aria-hidden="true">·</span>
            <a className={textLinkClassName} href="https://github.com/MBabaiants/stoic-random-quote" target="_blank" rel="noreferrer">View source <svg className="ml-1 inline size-3 align-[-1px]" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </div>
        </header>

        <Quote />
      </main>

      <Analytics />
    </QueryClientProvider>
  )
}

export default App
