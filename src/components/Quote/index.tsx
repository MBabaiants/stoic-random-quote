import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { type ComponentProps } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type QuoteData = {
  id: string
  text: string
  author: string
}

const fetchQuote = async (): Promise<QuoteData> => {
  const { data } = await axios.get('/api/quote')

  return {
    ...data,
    id: crypto.randomUUID(),
  }
}

const quoteVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
}

const authorVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.15,
    },
  },
}

const buttonVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.15,
    },
  },
}

function AnimatedQuoteText({ text }: { text: string }) {
  return (
    <motion.blockquote
      className="font-bonheur tracking-wider italic text-[clamp(2.2rem,3vw,3rem)] leading-none text-sepia"
    >
      {text}
    </motion.blockquote>
  )
}

export default function Quote({
  className,
  ...props
}: ComponentProps<'section'>) {
  const {
    data: quoteData,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['randomQuote'],
    queryFn: fetchQuote,
    staleTime: Infinity,
    retry: false,
  })

  const handleNextQuote = async () => {
    await refetch();
  }

  return (
    <section
      {...props}
      className={`flex flex-col max-w-4xl gap-10 p-7 max-md:h-full max-md:justify-center ${className ?? ''}`}
    >
      {isPending && (
        <motion.span
          className="self-center text-2xl text-sepia"
          animate={{
            opacity: [0.8, 0.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          aria-live="polite"
        >
          Thinking...
        </motion.span>
      )}

      {isError && !isFetching && (
        <motion.div
          className="flex flex-col items-center gap-4 text-sepia"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          <span className='text-4xl'>Something went wrong.</span>

          <button
            type="button"
            onClick={handleNextQuote}
            className="text-xl tracking-none text-terracotta bg-transparent border border-terracotta py-3 px-10 cursor-pointer outline-none transition-all duration-300 ease-out hover:bg-terracotta hover:text-parchment hover:-translate-y-0.5"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {quoteData && (
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteData.id}
            className="flex flex-col gap-4 max-md:grow max-md:justify-center"
            variants={quoteVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AnimatedQuoteText text={quoteData.text} />

            <motion.footer
              className="font-bonheur italic self-end text-stone-dark text-[clamp(2rem,2vw,2.25rem)] leading-none"
              variants={authorVariants}
            >
              {quoteData.author}
            </motion.footer>
          </motion.div>

          <motion.button
            type="button"
            disabled={isFetching}
            onClick={handleNextQuote}
            variants={buttonVariants}
            className="self-center text-sm tracking-none text-terracotta bg-transparent border border-terracotta py-3 px-10 cursor-pointer outline-none transition-all duration-300 ease-out hover:bg-terracotta hover:text-parchment max-md:w-full"
            aria-label="Get next quote"
          >
            Next Quote
          </motion.button>
        </AnimatePresence>
      )}
    </section>
  )
}