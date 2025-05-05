+++
date = '2025-05-05T22:40:54+02:00'
title = 'Securing Cloudflare'
tags = ['Security', 'Networking']
draft = false
+++
---

If you're using Cloudflare as your domain registrar, there's a lot of tools you can use to prevent malicious requests, bots, crawlers and script kiddies.

# Exclude requests not from your country
---

First of all, if you're using your domain just to expose some apps to the internet, like ***Jellyfin*** or ***Immich*** for your friends or family, it is likely that the only legitimate requests made to your domain comes only comes from the country you live in. Requests from other countries are probably unwanted, unless you're using a VPN.

To filter these out, go to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your **domain**. In the sidebar, select **Security** > **WAF** and **Create rule**<br>

Give it a name, then select:

**Field**: Country<br>
**Operator**: does not equal<br>
**Value**: Your country<br>
**Choose action**: block<br>
**Place at**: First<br>
<br>
Expression Preview should look like: <pre><code class="conf">(ip.geoip.country ne "\<your country code\>")</code></pre>
<br>

![WAF Rule](/img/cf-waf-ipblock.webp)

Save the WAF rule and voilà! Any requests that does not come from an IP from the same country as yours will be automatically blocked.

> ⚠️ If you're using VPNs you could be blocked from accessing your domain.

# Block malicious requests
---

We can also block url containing certain words like **gpg**, **curl**, **wget**, **\<script**, **<?php**, **fopen**, **exec**, etc.. These requests are probably malicious and **made by scripts scanning the internet to find vulnerable websites.**<br>

To **block these (probably) malicious requests**, as before, go to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your **domain**. In the sidebar, select **Security** > **WAF** and **Create rule**. Name it however you like.<br>

Next to **Expression preview**, click on **Edit expression**, then paste (<u>don't paste the '**#**'</u>):

```

(lower(http.request.uri.query) contains "script"\) or
(lower(http.request.uri.query) contains "<?php") or
(lower(http.request.uri.query) contains "function") or
(lower(http.request.uri.query) contains "delete ") or
(lower(http.request.uri.query) contains "union ") or
(lower(http.request.uri.query) contains "drop ") or
(lower(http.request.uri.query) contains " 0x") or
(lower(http.request.uri.query) contains "select ") or
(lower(http.request.uri.query) contains "alter ") or
(lower(http.request.uri.query) contains ".asp") or
(lower(http.request.uri.query) contains "svg/onload") or
(lower(http.request.uri.query) contains "base64") or
(lower(http.request.uri.query) contains "fopen") or
(lower(http.request.uri.query) contains "eval(") or
(lower(http.request.uri.query) contains "magic_quotes") or
(lower(http.request.uri.query) contains "allow_url_include") or
(lower(http.request.uri.query) contains "exec(") or
(lower(http.request.uri.query) contains "curl") or
(lower(http.request.uri.query) contains "wget") or
(lower(http.request.uri.query) contains "gpg")
```

**Choose action**: block<br>
**Place at**: Custom<br>
**Select which rule this will fire after:** *\< choose the country rule you made earlier \>*<br>

<br>![WAF Rule](/img/cf-waf-malicious-reqs.webp)<br>

# Block bots using built-in Cloudflare tools
---

In the sidebar, inside **Security** > **Bots** you can enable several features to prevent bots and crawlers from accessing your website. I recommend enabling:

**Bot Fight Mode**<br>
**Block AI Bots**<br>
**AI Labyrinth**<br>

<br>![Cloudflare's bot blocking features](/img/cf-bots.webp)<br>

# Miscellaneous security settings
---

In the sidebar, inside **Security** > **Settings**, I recommend you to enable:

**Browser Integrity Check**<br>
**Replace insecure JavaScript libraries**<br>

# Statistics
---

I'm only using **WAF rules** and settings discussed here.
Here's my Cloudflare report for the last 30 days :

<br>![Cloudflare threats report](/img/cf-threats-report.webp)<br>

Majority of IPs that hit my domain are from **Singapore** which is nowhere near from where I live. In my use case, any request coming from a country other than the one I live in is probably malicious.

Here's the most threats by country:<br>
<br>![Cloudflare report on most threats classified by countries](/img/cf-threats-countries.webp)

---