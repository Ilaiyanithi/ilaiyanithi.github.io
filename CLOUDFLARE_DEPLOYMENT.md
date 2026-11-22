# Cloudflare Pages Free Migration & Deployment Guide

**Target Website:** Personal Portfolio & Brand Showcase  
**Repository:** `https://github.com/Ilaiyanithi/ilaiyanithi.github.io`  
**Hosting Model:** Cloudflare Pages (100% Free Tier on `*.pages.dev`)  
**Existing Hosting:** GitHub Pages remains active and uninterrupted (Dual-Deployment)  

---

## 1. Project Inspection & Architecture Audit

Before configuring deployment, the repository was audited to determine the exact runtime and build requirements:

| Parameter | Detected Value | Notes / Implications |
| :--- | :--- | :--- |
| **Framework** | **Static HTML5 / CSS3 / Vanilla JS** | No frontend framework (No React, Vue, Svelte, Next.js, or Astro). |
| **Build System** | **None Required** | Pure static files. Direct CDN edge distribution. |
| **Dependencies** | **Zero (0) npm packages** | No `node_modules` overhead, no supply-chain risks, instant build time (~15-25 seconds). |
| **Production Root** | `.` (Repository Root) | `index.html` is at root; portfolio is at `me/index.html` and `me.html`. |
| **Assets Directory** | `/portfolio/`, `/assets/`, `/css/` | Root-relative paths `/portfolio/...` resolve identically on Cloudflare Pages and GitHub Pages. |
| **Required Build Command** | *(Leave Empty)* | Do **NOT** specify `npm run build` or any build command. |
| **Required Output Directory** | `.` (or `/` or `./`) | Cloudflare will directly serve files from the root repository folder. |
| **Environment Variables** | **None** | No secrets or build environment keys needed. |

---

## 2. Pre-Configured Cloudflare Pages Files

The following configuration files are already prepared and committed in your repository:

1. **`_headers`**
   - Implements strict security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
   - Configures 1-year immutable caching for static assets (`/portfolio/*`, `/assets/*`, `/css/*`) and `must-revalidate` on HTML pages for immediate cache freshness upon new deployments.
2. **`_redirects`**
   - Contains 301 permanent redirect from `/me.html` to clean canonical `/me/`:
     ```text
     /me.html    /me/    301
     ```
3. **`.nojekyll`**
   - Keeps GitHub Pages active in parallel without interference from Jekyll.

---

## 3. Step-by-Step Instructions to Deploy on Cloudflare Pages

Follow these exact steps in your web browser. This process is 100% free with no credit card required.

### Step 1: Create a Free Cloudflare Account
1. Open your browser and go to [https://dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up).
2. Enter your email and create a password.
3. Verify your email address by clicking the link sent to your inbox.

---

### Step 2: Open Workers & Pages
1. In the left navigation sidebar of the Cloudflare Dashboard, click **Compute (Workers) > Workers & Pages** (or directly **Workers & Pages**).
2. Click the blue **Create application** button.
3. Select the **Pages** tab at the top.
4. Click **Connect to Git**.

---

### Step 3: Connect Your GitHub Account
1. Click **Connect GitHub**.
2. A GitHub authorization popup will appear. Select your GitHub account (`Ilaiyanithi`).
3. Choose **Only select repositories** and pick `ilaiyanithi.github.io` (or grant access to all repositories).
4. Click **Install & Authorize**.
5. You will be redirected back to Cloudflare Pages.

---

### Step 4: Select Your Repository
1. Select `ilaiyanithi.github.io` from the list of repositories.
2. Click **Begin setup**.

---

### Step 5: Configure Build & Deployment Settings
Enter the following **exact settings** in the setup screen:

| Setting Field | Exact Value to Enter / Select |
| :--- | :--- |
| **Project name** | `ilaiyanithi` *(or `ilaiyanithi-portfolio`)* |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | *(Leave completely blank / empty)* |
| **Build output directory** | `.` *(a single period, representing root)* |
| **Root directory (advanced)** | *(Leave blank)* |
| **Environment variables** | *(None)* |

---

### Step 6: Deploy
1. Click **Save and Deploy** at the bottom of the page.
2. Cloudflare will clone your repository, inspect files, and publish them across 300+ global data centers.
3. Deployment will finish in approximately **15 to 30 seconds**.
4. You will see a success screen with your free URL:
   `https://<your-project-name>.pages.dev`

---

## 4. Verification & Testing

Once Cloudflare displays **"Success! Your project is deployed"**, test the following routes:

1. **Portfolio URL:** `https://<your-project-name>.pages.dev/me/`
   - Verify that your photo, hero headline, projects, skills, and CV download load cleanly.
2. **Clean Redirect Test:** `https://<your-project-name>.pages.dev/me.html`
   - Should instantly 301-redirect to `https://<your-project-name>.pages.dev/me/`.
3. **Homepage:** `https://<your-project-name>.pages.dev/`
   - BrandUp Branding agency page loads with images and styling intact.
4. **Robots.txt & Sitemap:**
   - `https://<your-project-name>.pages.dev/robots.txt`
   - `https://<your-project-name>.pages.dev/sitemap.xml`

---

## 5. Automatic CI/CD Pipeline (Future Updates)

- **Continuous Deployment:** Cloudflare Pages is now connected directly to your GitHub repository `main` branch.
- Every time you push a change (`git push origin main`), Cloudflare Pages will automatically detect the commit, deploy the update within seconds, and provide preview links.
- **Dual-Hosting:** Your existing GitHub Pages site (`https://ilaiyanithi.github.io/me/`) remains active and working simultaneously without interference.

---

## 6. Cloudflare Pages Settings Quick Reference

```text
Project Name:            ilaiyanithi
Production Branch:       main
Framework Preset:        None
Build Command:           (empty)
Build Output Directory:  .
Root Directory:          (empty)
```
