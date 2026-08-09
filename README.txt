KHATA — PWA BUNDLE
====================

What's in this folder:
  index.html              your Khata app, now with PWA hooks added
  manifest.json            app name/icons/colors for install prompts
  service-worker.js        required for installability (network-first, minimal)
  icon-192.png             app icon
  icon-512.png             app icon, high-res
  icon-maskable-512.png    Android adaptive icon
  apple-touch-icon.png     iOS home-screen icon
  favicon-32.png           browser tab icon

Same setup as your CA Desk bundle — same steps apply:

1. Upload all 9 files to a new GitHub repo (e.g. "khata")
2. Enable GitHub Pages (Settings > Pages > branch: main > root)
3. You'll get a link like https://yourusername.github.io/khata/
4. Windows: open in Edge/Chrome > click Install icon in address bar
5. iPhone: open in Safari > Share > Add to Home Screen
6. Android via AppMint: Create from URL > paste your GitHub Pages link >
   upload icon-512.png as the app icon > Generate APK

IMPORTANT: must be hosted on https:// (not opened as a local file) for
install prompts and the service worker to work.
