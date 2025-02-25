+++
date = '2025-02-25T15:55:52+01:00'
title = 'Basics and Fundamentals'
tags = ['Security']
draft = false
+++
---

The weakest part is always the person behind the computer. This page will ensure you have good security practices before doing any hardening.

You'll be wasting your time Hardening your server if your password is **1234** 😉

<br>

# Store your passwords
---

If you want to use a password manager, **DON'T USE ANY CLOUD BASED SERVICES**: What's the point of having strong passwords <u>if you store them on anyone else's computer?</u> If you really want a remote password manager accessible from anywhere, I recommend **Vaultwarden** (which is a **Bitwarden** reimplementation)

IMO, something offline should be prefered, in this case, I recommend **KeePassXC**.

<br>

# Keep your system up-to-date
---

When upgrading your system bugs will be fixed and vulnerabilities will be patched. For a good security you should keep your systems updated.

For **Debian or derivatives (Ubuntu, etc..)**:

`sudo apt update && sudo apt dist-upgrade`<br>
*'dist-upgrade' allows installation of new packages when upgrading in opposite to 'upgrade' which is not able to add or remove new packages. It is useful when upgraded packages gets new dependencies.*

For **OpenSUSE**:

`sudo zypper refresh && sudo zypper update`

For **Fedora, AlmaLinux, RHEL distros, etc..**:

`sudo dnf upgrade --refresh`<br>
⚠️ *don't forget to reboot! as stated in the [official documentation](https://docs.fedoraproject.org/en-US/quick-docs/upgrading-fedora-offline/#sect-performing-system-upgrade)*

For **Alpine Linux**:

`sudo apk update && sudo apk upgrade`

<br>

# Disable root user-account
---

You don't want to use the *root* user account directly, use **sudo** or **doas** instead. **Sudo** should be installed on most distribution, therefore if not, install it and execute: `sudo usermod -aG sudo <user>` This will add your user account to the **sudo group**, which allow you to use **sudo**.

To disable root account without loosing root access through *sudo*, use: `passwd --lock root`

---
