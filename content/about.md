+++
date = '2025-02-25T17:08:53+01:00'
title = 'About'
tags = ['']
draft = true
+++
---

# Hi,
i'm a French person passionate about technology, IT and computers in general.
I love tinkering with Docker, Linux in general and pretty much everything that involves playing with config files :)<br>
I personnaly own a Poweredge T320 ~& a custom built NAS~~ *(I repurposed it as a gaming console using ChimeraOS)*

<u>I don't work in IT, i'm not a professional, I'm just a hobbyist tinkering with his own servers, so take everything here with a grain of salt. I try to be the most precise and I'll try to source my posts at best to let you do your own research.</u>

After more of a decade using Windows, I finally switch completely to Linux 3 years ago after tinkering with server distros for more than 2 years. At this time, I was using a laptop with broken screen as my home server, because of this I learned a lot about CLI.

I mostly familiar with **Arch Linux**, **Debian** and **Ubuntu Server** (who isn't familiar with Ubuntu?)<br>
Honorable mention to **Alpine Linux**. I love it, it's a very good distribution, it's lightweight and very suitable for VMs.

# Computers Details
### Main desktop
- Ryzen 5 3600
- 48gb DDR4 2666MHz
- RTX 4060
- 1tb NVMe
- 1tb HDD
- oh, and I use arch btw<br>


### Macbook Pro
- M1 Pro
- 16gb RAM
- 500gb SSD

This is my main music production device.
I use it when I travel (almost never) and to test mac-only apps.<br><br>

# Servers details:
### Poweredge T320
- Intel Xeon E5-2420 v2 @ 2.20GHz
- 32GB DDR3
- GTX 1660 SUPER *(with [nvidia-patch](https://github.com/keylase/nvidia-patch) for Transcoding)*
- 4 x 3tb SAS HDD *(7k rpm)*
  - for data and backups, and I also seed Linux ISOs. Having OS, Docker and programs on a different HDD pool allows faster I/O performance for both the system and the file operations.
  - RAID 5, approximately 9tb avail.
- 2 x 300gb SAS HDD *(15k rpm)*
  - mainly for OS & programs, I watched some performance tests, IIRC two 15k HDD are not much slower compared to SATA SSDs
  - RAID 0

This is my main server. I use it for backups, torrents, NAS, Docker... therefore it handles my 20+ container very well and it almost never reach half of CPU usage.<br><br>
One reason I switched my apps from my NAS to this box is the price of SAS disks compared to SATA, for the price of 12tb of capacity (SAS, used), I could only buy 6tb of capacity (SATA, also used)<br>
Anyways, I am very happy about it, yet it draws quite a bit of energy

---
