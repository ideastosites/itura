# ITURA Project: Nodemailer Integration & cPanel Readiness

The enterprise-grade email notification system and UI restorations are complete! I have successfully implemented the backend Nodemailer infrastructure, secured the forms, fixed the corrupted React UI code, and configured the project to run as a single unified application on your RackNerd cPanel hosting.

## What Was Accomplished

### 1. Unified Node.js Architecture for cPanel
Your frontend (Vite React) and backend (Express API) have been unified into a single application (`server.js`). This is optimized perfectly for **RackNerd cPanel**, which uses Phusion Passenger to run Node.js apps.
- The `dist/` folder (compiled React code) is automatically served by your backend server.
- The `server.js` file handles both the static website loading and the `/api/contact` email routing.

### 2. Custom Nodemailer API (`server.js`)
- Integrated `nodemailer` to securely route emails from the landing page.
- Built a **High-Fashion HTML Email Template**: All incoming leads (VIP Access & General Inquiries) will arrive in your inbox perfectly styled with your ITURA Burgundy (`#6B0E1E`) and Gold branding, featuring clear, scannable data tables.
- **Honeypot Bot Protection**: Implemented a hidden field (`website_url`) to silently drop bot spam without blocking legitimate user submissions.

### 3. Frontend Form Restoration (`App.tsx`)
- Completely cleaned and repaired `App.tsx` from the syntax errors and corrupted artifacts.
- Linked the **VIP Access / RSVP Modal** and the **Footer Contact Form** directly to the `/api/contact` endpoint.
- Removed the old "Active Pillar", exact copy sections, and Explore Store button as requested.
- Implemented robust loading states ("Sending...") and success/failure alerts.

---

## How to Deploy on RackNerd cPanel

Now that the codebase is completely production-ready, follow these steps to deploy your ITURA landing page on your RackNerd cPanel account:

### Step 1: Prepare the Files
1. Create a ZIP file containing the following files and folders from this project directory:
   - `dist/` (This contains your compiled frontend)
   - `server.js` (Your unified backend and static server)
   - `package.json` and `package-lock.json`
   - `.env.local` (Make sure you configure your email credentials here)

### Step 2: Configure Environment Variables
Inside your `.env.local` file (or just `.env`), ensure you have your SMTP details securely added:
```env
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=465
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
CONTACT_EMAIL=info@ituraafrica.com
```
> [!TIP]
> If you are using Gmail, you MUST use an **App Password** for `SMTP_PASS`, not your regular login password. If you are using RackNerd's webmail, find the SMTP details in your cPanel under "Email Accounts > Connect Devices".

### Step 3: Setup Node.js in cPanel
1. Log into your RackNerd cPanel account.
2. Scroll down to the **Software** section and click on **Setup Node.js App**.
3. Click the **Create Application** button.
4. Fill in the configuration:
   - **Node.js version**: Select `18.x` or `20.x` (Recommended).
   - **Application mode**: `Production`
   - **Application root**: Type `itura_app` (or any folder name you prefer).
   - **Application URL**: Select your domain (`ituraafrica.com`).
   - **Application startup file**: Type `server.js` (This is crucial!).
5. Click **Create**.

### Step 4: Upload Your Files
1. Go back to the cPanel dashboard and open **File Manager**.
2. Navigate to the `itura_app` folder you just specified.
3. Upload the ZIP file you created in Step 1 and **Extract** it into this folder.

### Step 5: Install Dependencies & Start
1. Go back to **Setup Node.js App** in cPanel.
2. Edit your ITURA application.
3. Scroll down to the **Run NPM Install** button and click it to install all required backend packages (`express`, `nodemailer`, `cors`, `dotenv`).
4. Once installation is complete, click **Restart** at the top of the page.

Your unified ITURA application, complete with a secure Nodemailer contact system, will now be live and accepting VIP inquiries on your domain!
