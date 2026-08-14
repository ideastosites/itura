# ITURA Deployment & Email Setup Guide (cPanel / Racknerd)

This guide covers exactly how to take your optimized Vite + React SPA and Node.js Express backend and host them on Racknerd's cPanel, as well as how to set up your email accounts to work seamlessly with the contact forms.

---

## 1. Setting up your Emails in cPanel

Before deploying the code, you need to create the email addresses that the contact forms will use.

1. Log into your **Racknerd cPanel**.
2. Scroll down to the **Email** section and click on **Email Accounts**.
3. Click the **+ Create** button on the right side.
4. **Create the following two accounts:**
   - **Username:** `info` (will become `info@ituraafrica.com`)
   - **Username:** `brands` (will become `brands@ituraafrica.com`)
   - Set a strong password for both (and save these passwords securely!).
   - Set Storage Space to **Unlimited** (or 1024 MB).
5. **Set up Resend API (Critical for the backend):**
   - Go to [Resend.com](https://resend.com) and create an account.
   - Verify your domain (`ituraafrica.com`) in the Resend dashboard.
   - Generate an API Key. You will need this for the `.env` file later.

> [!TIP]
> Ensure you verify your domain in Resend so emails are delivered reliably from `noreply@ituraafrica.com` rather than the default onboarding address.

---

## 2. Preparing the Files for Upload

Your local code needs to be prepared for the production server.

1. In your local terminal, stop any running servers and run:
   ```bash
   npm run build
   ```
2. This creates a `dist` folder. The `server.js` file is already configured to serve this `dist` folder automatically (`app.use(express.static(path.join(__dirname, 'dist')));`).
3. You need to upload the following items to cPanel:
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - The entire `dist` folder (zip it up locally as `dist.zip` to upload it easily).

---

## 3. Hosting the Website (Setup Node.js App)

Since this project has an Express backend (which handles the emails) that also serves the React frontend, we will host the entire project using cPanel's Node.js selector.

1. Log into your **cPanel**.
2. Scroll down to the **Software** section and click on **Setup Node.js App**.
3. Click **Create Application**.
4. Fill out the application settings:
   - **Node.js version:** Select `20.x` or higher.
   - **Application mode:** `Production`
   - **Application root:** `/home/yourcpanelusername/itura_app` (Type `itura_app`. This tells cPanel to put the code in a folder outside the public web root for security).
   - **Application URL:** Select `ituraafrica.com` from the dropdown. Leave the path blank.
   - **Application startup file:** `server.js`
5. Click **Create**.
6. cPanel will generate the `itura_app` folder. Go back to cPanel Home -> **File Manager** -> navigate to `/home/yourcpanelusername/itura_app`.
7. Upload your files here:
   - Upload `server.js`, `package.json`, and `package-lock.json`.
   - Upload `dist.zip` and extract it (ensure it extracts as a folder named `dist`).
   - Create a new file called `.env` and add your email credentials (see Section 4).

---

## 4. Configuring the Environment Variables (`.env`)

In the `/home/yourcpanelusername/itura_app` folder, edit the `.env` file you just created and paste the following (replacing with your actual details):

```env
NODE_ENV=production
PORT=3001

# Resend API Configuration
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=ITURA Portal <noreply@ituraafrica.com>

# The fallback receiver
CONTACT_EMAIL=info@ituraafrica.com
```

---

## 5. Installing Dependencies & Starting the App

1. Go back to **Setup Node.js App** in cPanel.
2. Edit your `ituraafrica.com` application.
3. Scroll down to the **Modules** section. Click the **Run NPM Install** button. This will read your `package.json` and safely install `express`, `nodemailer`, `cors`, etc.
4. Once installation is complete, click **Restart Application** at the top.
5. **Verify:** Go to `https://ituraafrica.com`. You should see the blazing fast React site!
6. **Test the Forms:** Submit a test inquiry on the site. Check your `info@ituraafrica.com` or `brands@ituraafrica.com` webmail to ensure the Nodemailer backend delivered the message successfully.
