+++
date = '2025-02-25T00:06:32+01:00'
title = 'Hardening SSH'
tags = ['SSH']
draft = true
+++
---
First thing we want is to do is **disable root login** on your machine. Before proceeding, create a new user with the command:

`useradd -m <user>`

then create a **STRONG** password for it. You don't wan't someone to guess your password. I recommend a randomly generated password + a password manager to store it.

Next, we want to **disable password authentication**, we will authenticate using an **SSH Key**. This means that only computers with approved SSH keys will be able to connect.



To approve our key, we first need to create one.

# Generate SSH Keys
---

If you have a file called ***\<something\>*.pub** in your **/home/\<user\>/.ssh** folder, you can skip this section.

This section does not concern your server, everything explained here should be made on client computers, which means **computers that WILL BE authorized to connect to your server.**

![info card to explain how ssh key works.](/img/ssh-key-based-authentication.png)

Let's generate an key pair using the command:

`ssh-keygen`

> **Note that if you created a passphrase, you'll need to enter it at each connection.**

After answering a few questions, you should have these files in your **/home/\<user\>/.ssh** folder:

![.ssh folder](/img/ssh-folder.png)

# Copy SSH Keys
---

In the above screenshot, notice the file **authorized_keys**. **Inside your server**, this is where your client's key will reside.

Now that we have our key, still in the **.ssh** folder, you need to copy the content of **\<something\>.pub** *(in my case **id_rsa.pub**)* into the file **/home/\<user\>/.ssh/authorized_keys**

The most easy way to copy your SSH Key into your server's **authorized_keys** file is to use the **ssh-copy-id** command:

`ssh-copy-id <user>@<hostname>`

Now try to connect to your server using SSH, **now it should not ask for password to log-in.**

# Edit SSH Server configuration
---

Now let's dive into the meat and potatoes. We will now disable password authentication.

> ⚠️ Please be sure to properly set your keys in your server because once password auth is disabled, you could be locked outside. ⚠️

We will edit the configuration file located at **/etc/ssh/sshd_config**:

- Optional
- Uncomment & change ***PermitRootLogin yes*** to ***PermitRootLogin no***
- Optional, but you can uncomment ***AllowUsers*** and add specific users which will be the only ones authorized to connect.
- Verify that the ***AuthorizedKeysFile*** line points to ***.ssh/authorized_keys***
- Uncomment & change ***PasswordAuthentication yes*** to ***PasswordAuthentication no***
- Verify that the ***AuthenticationMethods*** line points to ***publickey***

Save the file, and restart **sshd** with:

`sudo systemctl reload sshd && sudo systemctl restart sshd`

To verify that password auth has been disabled, we will try to connect to the server using this command which force password authentication:

```
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -o PasswordAuthentication=yes <user>@<hostname>
```

It should return **permission denied (publickey)**

![ssh permission denied error](/img/ssh-pw-access-denied.png)

---
