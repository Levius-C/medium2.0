import Link from "next/link"

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto text-sm">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img className="object-contain cursor-pointer w-44" src="https://links.papareact.com/yvf" alt="LOGO" />
        </Link>
      </div>
      <div className="flex items-center space-x-5 text-slate-900">
        <div className="hidden md:inline-flex items-center space-x-5">
          <Link href="/ourstory">Our story</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/write">Write</Link>
        </div>
        <div className="hidden sm:inline-flex items-center space-x-5">
          <button>SIgn In</button>
        </div>
        <button className="text-white bg-slate-900 px-5 py-2 rounded-full">Get Started</button>
      </div>

    </header>
  )
}

export default Header