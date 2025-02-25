+++
date = '2025-02-25T17:08:53+01:00'
title = 'About'
tags = ['']
draft = true
+++
---

# Hi,
i'm a French person passionate about technology, IT and computers in general.
I love tinkering with servers, Linux in general, Rimworld, Team Fortress 2 and cats.<br>
I personnaly own a Poweredge T320 & a custom built NAS

<u>I don't work in IT, i'm not a professional, I'm just a hobbyist tinkering with his own servers, so take everything here with a grain of salt. I'll try to source my posts at best to let you do your own research.</u>

After more of a decade using Windows, I finally switch completely to Linux 3 years ago after tinkering with server distros for more than 2 years. I was using a laptop with broken screen as my home server at the time, therefore, I learned a lot about CLI at this time.

I mostly familiar with **Arch Linux**, **Debian** (and **DebianUnstable**) and **Ubuntu Server** (like everyone else)<br>
Honorable mention to **Alpine Linux**. I love it, it's a very good distribution, it's lightweight and very suitable for VMs.

# Computers Details
### Main desktop
- Ryzen 5 3600
- 48gb DDR4 2666MHz
- RTX 4060 (Main GPU)
- ~~GTX 1660 SUPER (to passthrough inside VMs)~~
- 1tb NVMe
- 1tb HDD
- oh, and I use arch btw

> This setup don't work anymore as I upgraded my main GPU. In a nutshell, i'm on AM4 socket, and it hasn't enough PCIe lanes, so my GPUs would run at PCIe 2x (for the RTX) and 4x (IIRC, for the GTX1660). I can't swap these because of **iommu groups** requiring me to also pass my ethernet adapter. It's easily resolvable by buying an Network Card, but I would not have enough PCIe ports and I don't want to use my 4060 at 2x.<br>
> I guess I'll go back to MacOS for my music production needs :)

Why passing a GPU to a VM ? mostly because I do music stuffs, and I don't like Linux DAWs at all <sub><sup>and I already had an FL Studio licence :)<br>
**(support developers if you love their products, especially if they offer lifetime update when every others don't ;)** <br><br></sub></sup>
And because it's very nice to have smooth VMs, I started using more with GPU, some to record videos, others to browse / use certains apps with VPNs (I find it easier to do "split-tunneling" that way instead of tinkering with **iptables**)

### Macbook - M1 Pro
- 16gb RAM
- 500gb SSD

I use it when I travel (almost never) and to test apps & stuff.<br>
Before I bought a 2nd GPU, it was my main music production device.

# Servers details:
### Poweredge T320
- Intel Xeon E5-2420 v2 @ 2.20GHz
- 32GB DDR3
- 4 x 3tb SAS HDD *(7k rpm)*
  - for data and backups, and I also seed Linux ISOs. Having OS, Docker and programs on a different HDD pool allows faster I/O performance for both the system and the file operations.
  - RAID 5, approximately 9tb avail.
- 2 x 300gb SAS HDD *(15k rpm)*
  - mainly for OS & programs, I watched some performance tests, IIRC two 15k HDD are not much slower compared to SATA SSDs
  - RAID 0

This is my main server. I use it for backups, torrents, NAS, Docker... therefore it handles my 20+ container very well and it almost never reach half of CPU usage.<br><br>
One reason I switched my apps from my NAS to this box is the price of SAS disks compared to SATA, for the price of 12tb of capacity (SAS, used), I could only buy 6tb of capacity (SATA, also used)<br>
Anyways, I am very happy about it, yet it draws quite a bit of energy
  
### Custom NAS
> Now that I have a new GPU, I plan to using the GTX 1660 within the T320 and definitely shut down this crap.

- Intel Core i7 6700
- 16gb DDR4 *(It previously had 32 but two sticks died)*
- 2 x (2 x 1tb SATA HDD) including one that is dead
  - That was my first NAS, awful at every level. Main pool is degraded, the case is the cheapest on Amazon, so disks are lying inside on top of each others, one pool (SSD) contains just one disk and the remaining of the RAM is dying. Oh, and every part was bought used so two motherboards died until now :)
  - two RAID 1 pools (~ 2tb avail.)
- 1 SDD - 500gb
  - It was mainly used for apps, now it's used as a fast network share as I don't have any other SSD on any of my other servers.
  
  
~~The only reason I still don't disconnect this monstruosity is Plex. I have no other GPU or CPU to replace the Core i7 for video transcoding. I think I will tranform it to a genuine Plex Box when I have enough money to buy at least two pair of HDD and a proper case.~~

As explained above, I plan to definitely shut down this NAS, I'll reuse both SSDs used in it and I'll probably trash HDD lying inside. I bought them used more than 3 years ago, and 1tb drive is very little space considering SATA ports are not unlimited.

---
