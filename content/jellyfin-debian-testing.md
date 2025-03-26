+++
date = '2025-03-26T13:00:56+01:00'
title = 'Install Jellyfin on Debian Testing without Docker'
tags = ['']
draft = true
+++
---

I'm using Debian Testing in my Server (I know, I know..), if you're using it like me, you'll notice that you can't install jellyfin using apt because it's not supported and some dependencies are not met.

This is not an issue, we can install these manually.

# Installing Jellyfin's APT repository
---

First, download and install the GPG signing key of Jellyfin's Team:

`sudo mkdir -p /etc/apt/keyrings`

`curl -fsSL https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg`

Then, create `/etc/apt/sources.list.d/jellyfin.sources`

Add:

<pre>
<code class="conf">[DEFAULT]
Types: deb
URIs: https://repo.jellyfin.org/debian
Suites: bookworm
Components: main
Architectures: amd64
Signed-By: /etc/apt/keyrings/jellyfin.gpg
</code>
</pre>

> ⚠️  Notice the **"Suites"** line. We must use **"bookworm"** instead of trixie (current debian testing). In the future change **bookworm** to the latest supported Debian **STABLE**. ⚠️

Now you can do
`sudo apt update`
There should be no issue.

# Installation
---

If you try installing Jellyfin now, you'll miss 3 dependencies:

- libvpx7
- libx265
- libllvm16

Download them using **wget**:
`wget http://ftp.de.debian.org/debian/pool/main/libv/libvpx/libvpx7_1.12.0-1+deb12u3_amd64.deb`

`wget http://ftp.de.debian.org/debian/pool/main/x/x265/libx265-199_3.5-2+b1_amd64.deb`

`wget http://ftp.de.debian.org/debian/pool/main/l/llvm-toolchain-16/libllvm16_16.0.6-15~deb12u1_amd64.deb`

> ⚠️  These are direct links from early 2025, search [debian.org/distrib/packages](https://www.debian.org/distrib/packages#view) for updated packages. ⚠️

And install them using **dpkg -i**:

`sudo dpkg -i libvpx7_1.12.0-1+deb12u3_amd64.deb`

`sudo dpkg -i libx265-199_3.5-2+b1_amd64.deb`

`sudo dkpg -i libllvm16_16.0.6-15~deb12u1_amd64.deb`

You should now be able to install **Jellyfin** using:

`sudo apt install jellyfin`

Which is a group, it installs **jellyfin-ffmpeg7**, **jellyfin-server** and **jellyfin-web**.

---
