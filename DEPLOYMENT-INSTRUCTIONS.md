# Deum.video - Next.js Deployment Instructions

**Status:** Ready to deploy!  
**Created:** 2026-03-26  
**Estimated deployment time:** 10-15 minutes

---

## ✅ What's Built

- **Next.js 16** with TypeScript and Tailwind CSS
- **Advanced Chat Widget** (team-aware, typing indicators, waiting states)
- **Homepage** with full content (hero, demo, features, pricing, testimonials)
- **FAQ Page** with complete Q&As
- **About Page**
- **Blog Page** (placeholder)
- **API Route** for secure chat (keeps OpenRouter key server-side)
- **Multi-Agent Team** (Naveed, Sarah, Nina, Matt, Lexi)

---

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
cd /Users/elliot/clawd/projects/deum/website-nextjs

# Create new repo on GitHub (https://github.com/new)
# Repository name: deum-website-nextjs
# Public or Private: Your choice
# Don't initialize with README

# Add remote and push
git remote add origin https://github.com/YOUR-USERNAME/deum-website-nextjs.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import `deum-website-nextjs` repository
3. Configure project:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
4. Add Environment Variables:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxx
   NEXT_PUBLIC_SITE_URL=https://deum.video
   ```
5. Click **Deploy**

### 3. Test on Staging URL

Vercel will give you a URL like: `deum-website-nextjs.vercel.app`

Test:
- ✅ Homepage loads
- ✅ Chat widget appears (bottom right)
- ✅ Click chat button → countdown → greeting
- ✅ Type message → bouncing dots → AI response
- ✅ FAQ page works
- ✅ About page works

### 4. Switch Custom Domain

Once tested:

1. In Vercel project settings → **Domains**
2. Add `deum.video` and `www.deum.video`
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (5-30 minutes)

---

## 🔑 Environment Variables

Add these in Vercel dashboard → Settings → Environment Variables:

| Variable | Value | Required |
|----------|-------|----------|
| `OPENROUTER_API_KEY` | `sk-or-v1-xxx` | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | `https://deum.video` | Optional |

**Get OpenRouter Key:**
- Dashboard: https://openrouter.ai/keys
- Create new key
- Model: `anthropic/claude-3-5-haiku-latest` (set in code)

---

## 📦 What Happens After Deploy

### Auto-Deploy Enabled
- Push to `main` branch → Vercel rebuilds automatically
- Pull requests → Preview deployments

### Update Knowledge
To update chat knowledge:
1. Edit `/public/data/deum-knowledge.json`
2. Commit and push
3. Vercel auto-deploys

---

## 🧪 Local Development

```bash
# Install dependencies
cd /Users/elliot/clawd/projects/deum/website-nextjs
npm install

# Create .env.local (copy from .env.local.example)
cp .env.local.example .env.local
# Edit .env.local and add your OPENROUTER_API_KEY

# Run dev server
npm run dev

# Open http://localhost:3000
```

---

## 🎨 Customization

### Update Team Members
Edit `/public/data/deum-knowledge.json` → `team.members`

### Update Pricing
Edit `/app/page.tsx` → Search for "Pricing" section

### Update FAQ
Edit `/app/faq/page.tsx` → `faqs` array

### Update Colors
- Primary: `indigo-500` and `indigo-600`
- Change in: `/components/ChatWidget.tsx` and `/app/page.tsx`

---

## 📊 Post-Deployment Checklist

- [ ] Chat widget loads and works
- [ ] Agent name shows correctly
- [ ] Typing indicators animate
- [ ] AI responses work
- [ ] All pages accessible (Home, FAQ, About, Blog)
- [ ] Links to app.deum.video work
- [ ] Mobile responsive
- [ ] Fast loading (Next.js optimizations active)

---

## 🐛 Troubleshooting

### Chat widget not responding
- Check Vercel logs for API errors
- Verify `OPENROUTER_API_KEY` is set
- Check browser console for errors

### Slow builds
- Next.js caching is automatic
- First build: ~2 minutes
- Subsequent: ~30 seconds

### Domain not working
- DNS propagation takes time (5-30 min)
- Check Vercel domain settings
- Verify DNS records match Vercel instructions

---

## 📁 Project Structure

```
website-nextjs/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── about/page.tsx        # About page
│   ├── faq/page.tsx          # FAQ page
│   ├── blog/page.tsx         # Blog index
│   └── api/chat/route.ts     # Chat API (secure)
├── components/
│   └── ChatWidget.tsx        # Advanced chat widget
├── public/
│   └── data/
│       └── deum-knowledge.json  # Chat knowledge base
├── .env.local.example        # Environment variables template
└── package.json              # Dependencies
```

---

## ✨ Features Included

### Chat Widget
- ✅ Multi-agent team (5 members)
- ✅ Random sticky assignment
- ✅ Returning visitor recognition
- ✅ Time-based greetings
- ✅ Bouncing dots typing indicator
- ✅ "Agent is helping..." waiting state
- ✅ Agent avatar & status
- ✅ Minimize/maximize
- ✅ Secure API (server-side key)

### Pages
- ✅ Homepage (hero, demo, features, pricing, testimonials)
- ✅ FAQ (14 complete Q&As)
- ✅ About
- ✅ Blog (placeholder for future content)

### Technical
- ✅ Next.js 16 App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Server-side API routes
- ✅ SEO-friendly
- ✅ Fast page loads
- ✅ Mobile responsive

---

## 🎯 Next Steps (Optional)

1. **Add Analytics**
   - Vercel Analytics (built-in)
   - Google Analytics 4
   - Plausible (privacy-friendly)

2. **Add Blog Posts**
   - Use MDX for markdown + React
   - Or migrate existing HTML blog posts

3. **Improve SEO**
   - Add meta descriptions
   - Generate sitemap
   - Add structured data

4. **Monitor Performance**
   - Vercel Analytics dashboard
   - Web Vitals tracking
   - Chat conversion rates

---

**Ready to deploy!** Follow steps 1-4 above and you'll have the new site live in ~15 minutes.

Questions? Check Vercel docs: https://vercel.com/docs
