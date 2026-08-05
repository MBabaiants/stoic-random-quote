import './App.css'

function App() {

  return (
    <>
      <main className='w-screen h-screen grid place-items-center bg-[url(./assets/mainBackground.png)] bg-no-repeat bg-cover bg-bottom-right'>
        <section className='flex flex-col items-end'>
          <blockquote className='tracking-wider italic text-5xl text-sepia'>I shall expose and reopen all the wounds which have already healed.</blockquote>
          <footer className='font-bonheur italic text-3xl text-stone-dark'>Seneca</footer>
        </section>
      </main>
    </>
  )
}

export default App
