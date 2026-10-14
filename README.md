# BhanuAI

Personal portfolio site. React + TypeScript, Vite, Tailwind, shadcn/ui.

## Running it

```bash
npm install
npm run dev
```

Dev server runs on port 8080 (set in `vite.config.ts`).

## Scripts

| | |
|---|---|
| `npm run dev` | dev server with HMR |
| `npm run build` | production build to `dist/` |
| `npm run preview` | serve the built output |
| `npm run lint` | eslint |
| `npm test` | vitest |

## Where things live

Almost all the content is in `src/data/profile.ts`: bio, skills, projects,
experience, achievements. Editing that file is usually all you need; the
components just render it.

- `src/components/portfolio/` - the page sections (Hero, About, Projects, etc.)
- `src/components/ui/` - shadcn components, mostly untouched
- `src/index.css` - theme tokens, glass/card utilities, keyframes
- `public/resume.pdf` - linked from the Resume button in the hero

The hero portrait is `src/assets/profile-hero.webp`, a cut-out on a transparent
background so the card can supply its own backdrop. If you swap it, keep the
3:4 framing or the crop will clip.

## Env

Copy `.env.example` to `.env.local` and fill in what you need. `.env.local` is
git-ignored.

Optional. Set a canonical origin for JSON-LD and Open Graph tags:

```
VITE_SITE_URL=https://yourdomain.com
```

## Contact form (EmailJS)

The contact form sends through [EmailJS](https://www.emailjs.com) from the
browser, so there is no backend to run. Until it is configured the form falls
back to opening the visitor's mail client, so it is never a dead end.

### What goes in the frontend

**Only the public key.** Every `VITE_*` value is inlined into the JavaScript
bundle that visitors download, so it is readable by anyone. Never put the
EmailJS **private key**, an SMTP password, or any other secret into a `VITE_*`
variable or anywhere under `src/`. The private key is for server-side REST
calls only.

Abuse of the public key is contained in the EmailJS dashboard, not in this
code: restrict allowed origins to your domain and set a monthly send limit.

### Setup

1. **Create an account** at emailjs.com and verify your email.

2. **Connect your inbox.** Email Services -> Add New Service -> pick Gmail (or
   whichever provider you use) and authorise it. Copy the **Service ID**
   (looks like `service_ab12cde`).

   Connecting via OAuth means EmailJS holds the mail credentials. You never
   paste an SMTP password into this project.

3. **Create a template.** Email Templates -> Create New Template. The form
   sends these four variables, so reference them with double braces:

   | Variable | Contents |
   |---|---|
   | `{{from_name}}` | sender's name |
   | `{{reply_to}}` | sender's email |
   | `{{subject}}` | subject, or a generated one if left blank |
   | `{{message}}` | the message body |

   A template that works:

   - **Subject:** `{{subject}}`
   - **Content:**
     ```
     From: {{from_name}} <{{reply_to}}>

     {{message}}
     ```
   - **To Email:** your own address
   - **Reply To:** `{{reply_to}}` — set this, or replying goes to yourself
     instead of the sender.

   Save, then copy the **Template ID** (`template_xy34fgh`).

4. **Copy the public key.** Account -> General -> Public Key.

5. **Add them to `.env.local`:**

   ```
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_SERVICE_ID=service_ab12cde
   VITE_EMAILJS_TEMPLATE_ID=template_xy34fgh
   ```

   Restart the dev server afterwards — Vite only reads env files at startup.

6. **Set the same three variables in your host** (Vercel: Settings ->
   Environment Variables) and redeploy. They are build-time values, so a
   deploy that ran before you added them will not pick them up.

7. **Lock it down.** Account -> Security: add your production domain to the
   allowed origins list, and set a monthly quota.

### How it behaves

- Validates name, email and message before sending; subject is optional.
- Shows a success toast **only** after EmailJS confirms a 200.
- Disables the button while sending, then locks it for 30 seconds.
- Blocks bots with an off-screen honeypot field and a minimum fill time.
- Maps EmailJS failures to plain-language messages, and never shows raw
  error text or IDs to the visitor.

The send and validation logic lives in `src/lib/emailjs.ts`, covered by
`src/test/emailjs.test.ts`. The form itself is `ContactForm.tsx`, which is
self-contained and can be dropped in anywhere.
