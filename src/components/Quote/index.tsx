import { useQuery, type QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios'
import BrandMark from '../BrandMark'

type QuoteData = {
  id: string
  text: string
  author: string
}

type QuoteResponse = {
  text?: unknown
  author?: unknown
}

function StarIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5v13M1.5 8h13M3.4 3.4l9.2 9.2M12.6 3.4l-9.2 9.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className="ml-1 inline size-3 align-[-1px]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

async function fetchQuote(signal?: AbortSignal): Promise<QuoteData> {
  const { data } = await axios.get<QuoteResponse>('/api/quote', { signal })
  if (
    !data ||
    typeof data.text !== 'string' || !data.text.trim() ||
    typeof data.author !== 'string' || !data.author.trim()
  ) {
    throw new Error('Invalid quote response')
  }

  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    text: data.text.trim(),
    author: data.author.trim(),
  }
}

export default function Quote() {
  const {
    data: quote,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['randomQuote'],
    queryFn: ({ signal }: QueryFunctionContext) => fetchQuote(signal),
    staleTime: Infinity,
    retry: false,
  })

  const requestAnother = async () => {
    if (isFetching) return;

    await refetch()
  }

  return (
    <section className="relative z-10 mx-auto flex w-full max-w-200 flex-1 flex-col items-center justify-center py-[clamp(20px,4vh,44px)] text-center max-[600px]:justify-start max-[600px]:py-[clamp(18px,4vh,32px)] max-[600px]:pt-8" aria-label="Random Stoic quote">
      <div className="mb-6 grid w-full max-w-185 place-items-center px-[clamp(8px,4vw,42px)] max-[600px]:mb-5 max-[600px]:px-0" aria-busy={isFetching}>
        {isPending && (
          <div className="flex flex-col items-center justify-center gap-5 text-[#6f604d]" role="status" aria-live="polite">
            <BrandMark variant="loader" />
            <span className="text-lg italic">A moment of reflection…</span>
            <span className="h-px w-9 bg-linear-to-r from-transparent via-[#a28b68] to-transparent" aria-hidden="true" />
          </div>
        )}

        {isError && !quote && !isFetching && (
          <div className="flex flex-col items-center justify-center gap-2 text-[#514536]" role="alert">
            <p className="m-0 text-xl">The next quote could not be reached.</p>
            <span className="text-sm text-[#786d5d]">Take a breath, then try again.</span>
            <button className="mt-2 cursor-pointer border-0 border-b border-[#927b5b] bg-transparent px-0 py-2 text-[#604c34] hover:text-[#382e25] focus-visible:outline-[3px] focus-visible:outline-[#8a6145] focus-visible:outline-offset-[5px]" type="button" onClick={requestAnother}>
              Try again <ArrowIcon />
            </button>
          </div>
        )}

        {quote && (
          <figure
            key={quote.id}
            className="flex w-full animate-quote-arrive flex-col items-center motion-reduce:animate-none"
            aria-live="off"
          >
            <span className="h-10 text-[59px] leading-none text-[#aa926c]" aria-hidden="true">“</span>
            <blockquote className="my-2.5 mb-6 max-w-[60ch] text-[clamp(24px,3.4vw,39px)] font-normal italic leading-[1.38] tracking-[-.02em] text-[#393027] text-pretty max-[600px]:text-[clamp(23px,6vw,30px)] max-[600px]:leading-[1.4] [@media(max-height:680px)]:my-1 [@media(max-height:680px)]:mb-3.75 [@media(max-height:680px)]:text-[clamp(22px,3vw,32px)]">
              {quote.text}
            </blockquote>
            <figcaption className="flex w-full items-center justify-end gap-3 text-[#75644e]">
              <span className="h-px w-5.75 bg-[#a89069]" aria-hidden="true" />
              <cite className="text-base italic tracking-[.06em]">{quote.author}</cite>
            </figcaption>
          </figure>
        )}

        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {isFetching && quote ? 'Finding another quote.' : ''}
          {isError && quote ? 'The next quote could not be reached. Your current quote is still shown.' : ''}
        </p>
      </div>

      {quote && (
        <div className="flex flex-col items-center gap-3">
          {isError && !isFetching && (
            <p className="m-0 text-[13px] text-[#755a42]">Couldn’t reach a new quote. Your current one is still here.</p>
          )}
          <button
            className="inline-flex min-h-10.5 items-center justify-center gap-2.5 border-0 border-b border-[#756044]/65 bg-transparent px-0.5 py-1 text-[17px] italic cursor-pointer tracking-[.015em] text-[#5d4a33] transition-[color,border-color,gap] duration-200 hover:gap-3.5 hover:border-[#55432e] hover:text-[#382e25] disabled:cursor-wait disabled:opacity-[.78] focus-visible:outline-[3px] focus-visible:outline-[#8a6145] focus-visible:outline-offset-[5px]"
            type="button"
            disabled={isFetching}
            onClick={requestAnother}
            aria-label={isFetching ? 'Loading another quote' : 'Get another quote'}
          >
            <span className={`text-[#987d58] ${isFetching ? 'animate-spin motion-reduce:animate-none' : ''}`}><StarIcon /></span>
            <span>{isFetching ? 'A moment…' : 'Another quote'}</span>
            <span className={`text-[#987d58] ${isFetching ? 'animate-spin motion-reduce:animate-none' : ''}`}><StarIcon /></span>
          </button>
        </div>
      )}
    </section>
  )
}
