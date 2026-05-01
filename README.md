# BookNest - Online Book Borrowing Platform

A responsive online book borrowing platform built with Next.js, Tailwind CSS, DaisyUI, BetterAuth, MongoDB, and SwiperJS.

## Checklist coverage

- Responsive navbar with Home, All Books, My Profile
- Conditional navbar UI: Login when logged out; user name and Logout when logged in
- Custom footer with social links and Contact Us
- Local JSON data with 12 book objects
- Home banner with "Find Your Next Read" and Browse Now button
- Marquee with new arrivals and membership discount text
- Featured Books section showing top 4 books
- Two extra home sections: Why BookNest and Reader Picks carousel
- Email/password login
- Email/password registration with Name, Email, Photo URL, Password
- Google social login button
- All Books search by title
- Category sidebar filter: All, Story, Tech, Science
- Private Book Details route
- Borrow This Book button with confirmation toast
- Private My Profile route showing user information
- Update Information route with Name and Image URL form
- Environment variable based config
- BetterAuth with MongoDB adapter
- SwiperJS package used for Reader Picks carousel

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` before running.

For Google OAuth, add this authorized redirect URI in Google Cloud Console:

```txt
http://localhost:3000/api/auth/callback/google
```

For production, replace localhost with your deployed domain and set `BETTER_AUTH_URL` to the same domain.

## Notes

- Passwords must be at least 8 characters.
- Email verification and forgot password are intentionally not implemented.
- Registration redirects users to the login page because `autoSignIn` is set to `false` in `lib/auth.ts`.
- Book data is local JSON data in `data/books.json`.
- Auth users and sessions are stored in MongoDB by BetterAuth.
