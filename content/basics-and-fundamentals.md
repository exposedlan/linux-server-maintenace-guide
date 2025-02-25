+++
date = '2025-02-25T15:55:52+01:00'
title = 'Basics and Fundamentals'
tags = ['Security']
draft = true
+++
---

The weakest part is always the person behind the computer. This page will ensure you have good security practices before doing any hardening.

You'll be wasting your time Hardening your server if your password is **1234** 😉

# Storing your passwords

If you want to use a password manager, **DON'T USE ANY CLOUD BASED SERVICES**: What's the point of having strong passwords if you store them on anyone else's computer? If you really want a remote password manager accessible from anywhere, I recommend **Vaultwarden** (which is a **Bitwarden** reimplementation)

IMO, something offline should be prefered, in this case, I recommend **KeePassXC**.

# Disabling root user-account

You don't want to use the *root* user account directly, use **sudo** instead. It should be installed on most distribution, therefore if not, install it and execute: `sudo usermod -aG sudo <user>` This will add your user account to the **sudo group**, which allow you to use **sudo**.

To disable root account without loosing root access through *sudo*, use: `passwd --lock root`

---
