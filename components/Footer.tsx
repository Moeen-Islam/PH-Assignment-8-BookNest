import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 px-4 py-12 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <Link href="/" className="text-3xl font-black text-white">
            Book<span className="text-amber-400">Nest</span>
          </Link>
          <p className="mt-4 max-w-sm text-slate-400">
            A modern online book borrowing platform for curious readers and digital libraries.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-black text-white">Contact Us</h3>
          <ul className="mt-4 space-y-2 text-slate-400">
            <li>Email: support@booknest.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Location: Digital Library Avenue</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black text-white">Social Links</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Facebook", "Instagram", "X", "LinkedIn"].map((item) => (
              <a key={item} href="#" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-amber-400 hover:text-amber-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-sm text-slate-500">
        Copyright {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
}
